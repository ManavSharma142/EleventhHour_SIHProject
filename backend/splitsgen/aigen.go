package splitsgen

import (
	"context"
	"fmt"
	"server/rag"
	"server/utils"

	"github.com/firebase/genkit/go/ai"
	"github.com/firebase/genkit/go/genkit"
	"github.com/firebase/genkit/go/plugins/googlegenai"
	"github.com/google/uuid"
)

type AIWorkoutSplit struct {
	Day []DayEntry `json:"day" jsonschema:"description=list of day entries with workouts"`
	ID  string     `json:"id" jsonschema:"description=unique identifier for the workout plan"`
}

type DayEntry struct {
	Day      string         `json:"day" jsonschema:"description=Day identifier (Monday, Tuesday,Wednesday, Thursday, Friday, Saturday, Sunday)"`
	Workouts []DailyWorkout `json:"workouts" jsonschema:"description=List of workouts for that day"`
}

type DailyWorkout struct {
	Title            string `json:"title" jsonschema:"description=Title of the workout session (Chest, Back, Legs, Arms, Shoulders, Core, Cardio, Rest(if no workout on that day)) title must be unique for that day"`
	ExerciseCategory string `json:"exercisecategory" jsonschema:"description=Category of the workout session (Chest, Back, Legs, Arms, Shoulders, Core, Cardio, Rest(if no workout on that day))"`
	ExerciseDesc     string `json:"exercisedesc" jsonschema:"description=Description of exercise how to perform it in brief"`
	Sets             int    `json:"sets" jsonschema:"description=number of sets"`
	Repetitions      int    `json:"repetitions" jsonschema:"description=number of repetitions"`
	Link             string `json:"link" jsonschema:"description=youtube url of exercise video"`
}

type RAGQueries struct {
	Query string `json:"Query" jsonschema_description:"Query to be used for RAG for seraching workout plans"`
}

var ragOutput string

func GenerateAIWorkoutSplits(request WorkoutRequest) AIWorkoutSplit {
	ctx := context.Background()
	g := genkit.Init(ctx,
		genkit.WithPlugins(&googlegenai.GoogleAI{}),
		genkit.WithDefaultModel("googleai/gemini-2.5-flash"),
	)
	getCustomDataTool := genkit.DefineTool(g, "getCustomData",
		"Gets the Custom data for workout plans by searching the queries provided in the input in vector database and returns the relevant information",
		func(ctx *ai.ToolContext, input RAGQueries) (string, error) {
			fmt.Println(utils.Cyan("RAG Query(LLM asked this): "), input.Query)
			out := rag.LookUP(input.Query, "SIH")
			fmt.Println(utils.Magenta("RAG Response(LLM gets this): "), out[1:100], ".....")
			ragOutput = out
			return out, nil
		})

	workoutFLow := genkit.DefineFlow(g, "workoutGeneratorFlow", func(ctx context.Context, input *WorkoutRequest) (*AIWorkoutSplit, error) {
		if input.Preference == "" {
			input.Preference = "Home"
		}
		prompt := fmt.Sprintf(`
		Generate a structured workout split based on the following criteria:
		- Time Available: %s
		- Goal: %s
		- Catagory: %s
		- Days Per Week: %d
		- Equipment Preference: %s
		- Other Notes: %s
		`, input.Time, input.Goal, input.Catagory, input.DaysPerWeek, input.Preference, input.Other)

		workout, _, err := genkit.GenerateData[AIWorkoutSplit](ctx, g,
			ai.WithPrompt(prompt), ai.WithTools(getCustomDataTool), ai.WithSystem(`
				Return ONLY valid JSON matching this schema:

				AIWorkoutSplit {
				day: [
					{
					day: "Monday|Tuesday|...|Sunday",
					workouts: [
						{
						title: string,
						exercisecategory: string,
						exercisedesc: string,
						sets: int,
						repetitions: int,
						link: string
						}
					]
					}
				],
				id: string
				}

				Rules:
				- Use exact field names (no typos, no extra fields).
				- Always return exactly DaysPerWeek days.
				- 3–7 exercises per day (except Rest → 1 workout with empty exercisedesc, sets=0, reps=0, link="").
				- Titles within a day must be unique (append numbers if needed).
				- Call getCustomData at least once; adapt info, never output raw.
				- Output must be strict JSON only, no markdown or text.
				`),
		)
		if err != nil {
			fmt.Println(utils.Red("Error generating workout splits:", err))
			retryres := retryGenerateAIWorkoutSplits(request)
			return utils.ToPtr(retryres), nil
		}
		return workout, nil
	})
	workout, err := workoutFLow.Run(ctx, &request)
	if err != nil {
		fmt.Println("Error generating workout splits:", err)
		retryres := retryGenerateAIWorkoutSplits(request)
		return retryres
	}
	workout.ID = "aisplitgen-" + uuid.New().String()
	fmt.Println(utils.Cyan("Successfully generated workout splits"))
	return *workout
}

func retryGenerateAIWorkoutSplits(request WorkoutRequest) AIWorkoutSplit {
	fmt.Println("Retrying....")
	ctx := context.Background()
	g := genkit.Init(ctx,
		genkit.WithPlugins(&googlegenai.GoogleAI{}),
		genkit.WithDefaultModel("googleai/gemini-2.5-flash"),
	)
	workoutFLow := genkit.DefineFlow(g, "workoutGeneratorFlow", func(ctx context.Context, input *WorkoutRequest) (*AIWorkoutSplit, error) {
		if input.Preference == "" {
			input.Preference = "Home"
		}
		prompt := fmt.Sprintf(`
		Generate a structured workout split based on the following criteria:
		- Time Available: %s
		- Goal: %s
		- Catagory: %s
		- Days Per Week: %d
		- Equipment Preference: %s
		- Other Notes: %s
		`, input.Time, input.Goal, input.Catagory, input.DaysPerWeek, input.Preference, input.Other)

		workout, _, err := genkit.GenerateData[AIWorkoutSplit](ctx, g,
			ai.WithPrompt(prompt), ai.WithSystem(`
			You are a professional fitness trainer specializing in student-friendly workout plans. 
			Your task is to generate a weekly workout split strictly in JSON format matching the provided schema. 
			You now also have access to the following reference data from a vector database: 
			`+ragOutput+`

			Rules:
			1. Follow the schema: day, workouts → (title, exercisecategory, exercisedesc, sets, repetitions). 
			- Do not add extra fields. 
			- Always return exactly the number of days requested by the user (DaysPerWeek). 
				If DaysPerWeek = 7, return exactly 7 days (Monday through Sunday) and dont use rest put some exercise. 
				If any of those days are rest, include them as 'Rest' but do not skip the day.

			2. Make 3 to 7 exercises per workout day depending on the user's time and goal.

			3. "title" and "exercisecategory" should match. For "Rest" days, give exactly one workout with title="Rest", exercisecategory="Rest", and empty exercisedesc.

			4. Use the vector database info (`+ragOutput+`) only as a **reference**. Adapt and refine it to fit the users exact request.

			5. If the provided info is not relevant, create the workout plan yourself.

			Your output must be strictly valid JSON, no markdown or explanations.
			`),
		)
		if err != nil {
			return nil, fmt.Errorf("failed to generate recipe: %w", err)
		}

		return workout, nil
	})
	workout, err := workoutFLow.Run(ctx, &request)
	if err != nil {
		fmt.Println("Error generating workout splits:", err)
		return AIWorkoutSplit{}
	}
	return *workout
}
