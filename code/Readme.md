# Flexora - AI-Powered Fitness Companion 💪

A comprehensive fitness application that combines AI-powered workout planning, real-time pose detection, and gamified fitness tracking to create an engaging workout experience.

## Tasks Accomplished

- [x] **AI Chat Bot Integration:** Implemented intelligent workout assistant with tools
- [x] **AI Split Generator:** Created smart workout split generation system tailored to user preferences and fitness goals with RAG (Retrieval-Augmented Generation)  
- [x] **Workout Management System:** Built comprehensive workout logging and tracking functionality with progress monitoring
- [x] **FlexCoins Gamification:** Developed reward system with FlexCoins to motivate users and track achievements
- [x] **Full-Stack Architecture:** Implemented robust backend with GoLang and responsive frontend with React

## Technology Stack

This project leverages the following technologies:

- **[React JS](https://reactjs.org/):** Frontend framework chosen for its component-based architecture and excellent user experience capabilities
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework for rapid UI development and consistent styling
- **[Framer Motion](https://www.framer.com/motion/):** Animation library for smooth, engaging user interface transitions and interactions
- **[GoLang](https://golang.org/):** Backend language selected for its performance, concurrency support, and excellent API development capabilities
- **[REST API](https://restfulapi.net/):** Architectural style for scalable and maintainable client-server communication
- **[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API):** Real-time bidirectional communication for live features like chat and pose detection
- **[MongoDB](https://www.mongodb.com/):** NoSQL database chosen for flexible schema design and excellent scalability for fitness data
- **[QDrant](https://qdrant.tech/):** Vector database for efficient similarity search in RAG implementation for AI chat responses
- **[Google Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/):** Advanced AI model for intelligent workout recommendations and chat functionality
- **[OpenCV](https://opencv.org/):** Computer vision library for real-time pose detection and workout form analysis
- **[Python](https://www.python.org/):** Used for AI model integration and pose detection processing
- **[MediaPipe](https://mediapipe.dev/):** Framework for building perception pipelines including pose estimation
- **[Docker](https://www.docker.com/):** Containerization platform for consistent development and deployment environments
- **[GitHub](https://github.com/):** Version control and collaboration platform for code management

## Key Features

- **AI Chat Bot with RAG:** Intelligent fitness assistant that provides personalized workout advice using retrieval-augmented generation
- **AI Split Generator:** Smart algorithm that creates customized workout splits based on user goals, experience level, and preferences
- **OpenCV Pose Detection:** Real-time form analysis and rep counting using computer vision for accurate workout tracking
- **Workout Logging System:** Comprehensive tracking of exercises, sets, reps, and progress with detailed analytics
- **FlexCoins Gamification:** Reward system that incentivizes consistent workouts and achievement milestones
- **Real-time Features:** WebSocket integration for live chat, notifications, and pose detection feedback
- **Progress Analytics:** Detailed insights into workout performance, strength gains, and fitness journey progression
- **Community Features:** Social elements including leaderboards and workout sharing capabilities

## Local Setup Instructions

Follow these steps to run the project locally:


### 1. Clone the Repository
```bash
git clone https://github.com/ManavSharma142/EleventhHour_SIHProject.git
cd flexora
```

### 2. Environment Setup
Create a `.env` file in the flexora-backend directory using the provided template:
Fill in the required environment variables in the `.env` file with your API keys and configuration values.
in flexora-backend

## Running Options

### Option 1: Docker Setup (Recommended)
This method works on both Windows/macOS/Linux with Docker installed.

```bash
cd code
docker-compose up --build
```

### Option 2: Manual Setup

#### For Windows/MacOS/Linux:

**Frontend Setup:**
```cmd
cd code
cd flexora-frontend
npm install
npm run dev
```

**Backend Setup (in a new terminal):**
```cmd
cd code
cd flexora-backend
go mod tidy
go run main.go
```


### 3. Accessing the Application

Once both services are running:
- Frontend: Open your browser and navigate to `http://localhost:5173`
- Backend API: Available at `http://localhost:8000`
- 
## Project Structure

```
flexora/
├── code/
│   ├── flexora-frontend/          # React frontend application
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── ...
│   ├── flexora-backend/           # GoLang backend API
│   │   ├── main.go
│   │   ├── router/
│   │   ├── model/
│   │   ├── .env.example
│   │   └── ...
│   ├── docker-compose.yml         # Docker configuration
│   └── ...
└── README.md
```

