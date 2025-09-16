package database

import (
	"context"
	"errors"
	"fmt"
	"log"
	"server/utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

var alldata = make(map[string]string)

type Data struct {
	ID       any    `bson:"_id,omitempty"`
	Username string `bson:"username"`
	Password string `bson:"password"`
	OAuth    string `bson:"oauth"`
	Email    string `bson:"email"`
	SplitID  string `bson:"split"`
	Name     string `bson:"name"`
	Age      string `bson:"age"`
	Gender   string `bson:"gender"`
	Goal     string `bson:"goal"`
	Exp      string `bson:"exp"`
	Pic      string `bson:"profilepic"`
}

var Dbcoll *mongo.Collection
var Splitcoll *mongo.Collection
var Progresscoll *mongo.Collection
var Activedayscoll *mongo.Collection
var Flexcoinscoll *mongo.Collection

func DBinit() {
	uri := utils.MONGODB_CLUSTER
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	client, err := mongo.Connect(options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI))
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	// verify connection
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}
	coll := client.Database("nothing").Collection("user")
	coll2 := client.Database("nothing").Collection("splits")
	coll3 := client.Database("nothing").Collection("progress")
	coll4 := client.Database("nothing").Collection("activedays")
	coll5 := client.Database("nothing").Collection("flexcoins")
	Flexcoinscoll = coll5
	Activedayscoll = coll4
	Progresscoll = coll3
	Splitcoll = coll2
	Dbcoll = coll
	log.Println(utils.Green("Database initiated sucessfully"))

}

func GetUserPassword(username string) (string, error) {
	var result Data
	filter := bson.M{"username": username}
	err := Dbcoll.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Println("Error finding user:", err)
	} else {
		fmt.Printf("User found: %+v\n", result.ID)
	}
	//log.Println(result)
	if result.Password == "" {
		return "", errors.New("not exist")
	}

	return result.Password, nil
}

func AddUser(username string, password string, oauthtoken string, email string, name string, age string, gender string, fitnessgoal string, experience string, profilepic string) error {
	filter := bson.M{"username": username}
	var existing Data
	Dbcoll.FindOne(context.TODO(), filter).Decode(&existing)
	if existing.Username != "" {
		log.Println("user already exists")
		return errors.New("user already exists")
	}

	alldata[username] = password
	_, err := Dbcoll.InsertOne(context.TODO(), bson.M{
		"username":   username,
		"password":   password,
		"oauth":      oauthtoken,
		"email":      email,
		"split":      "",
		"name":       name,
		"age":        age,
		"gender":     gender,
		"goal":       fitnessgoal,
		"exp":        experience,
		"profilepic": profilepic,
	})
	if err != nil {
		log.Println("Error writing in DB:", err)
		return err
	}

	return nil
}

func GetUserEmail(email string) (string, error) {
	var result Data
	filter := bson.M{"email": email}
	err := Dbcoll.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Println("Error finding user:", err)
	} else {
		fmt.Printf("User found: %+v\n", result.ID)
	}
	//log.Println(result)
	if result.Username == "" {
		return "", errors.New("not exist")
	}

	return result.Username, nil
}
func GetUser(username string) (*Data, error) {
	var user Data
	err := Dbcoll.FindOne(context.TODO(), bson.M{"username": username}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("user not found")
		}
		log.Println("DB error while fetching user:", err)
		return nil, err
	}
	return &user, nil
}
