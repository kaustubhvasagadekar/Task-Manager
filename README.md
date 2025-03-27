# Task Manager

Task Manager is a full-stack application built with React, Material UI, and Express on Node.js. It allows users to manage tasks and includes features such as user authentication, task creation, editing, deletion, and filtering.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup and Running the Project](#setup-and-running-the-project)
  - [Backend (API Server)](#backend-api-server)
  - [Frontend (React App)](#frontend-react-app)
- [Important Development Decisions](#important-development-decisions)
- [Troubleshooting](#troubleshooting)

## Features
- User Registration and Login using JWT-like patterns.
- Task CRUD operations with support for toggling completion.
- Filtering and search of tasks.
- Responsive UI built using Material UI components.

## Project Structure
```
task_it\
│
├── server/                # Express/MongoDB backend
│   ├── server.js          # Main server file with API endpoints
│   ├── db.js              # Database connection file
│   ├── package.json       # Backend dependencies and scripts
│   └── ...other files
│
└── taskmanager/           # React frontend application
    ├── public/            # Public files (e.g. index.html)
    ├── src/               # Application source code
    │   ├── components/    # React components (TaskList, TaskForm, etc.)
    │   ├── context/       # Context providers (AuthContext, TaskContext)
    │   ├── pages/         # Pages (Login, Register, Home)
    │   ├── utils/         # Utility functions (API calls with CRUD)
    │   ├── App.jsx        # App component
    │   └── ...other files
    ├── package.json       # Frontend dependencies and scripts
    └── vite.config.js     # Vite configuration file
```

## Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn
- MongoDB database (either local or MongoDB Atlas)

## Setup and Running the Project

### Backend (API Server)
1. Navigate to the server folder:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm i
   ```
3. Create a `.env` file in the server folder and add your MongoDB URI:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```
   npm start
   ```
   The server will run on [http://localhost:5000](http://localhost:5000)

### Frontend (React App)
1. Open a new terminal and navigate to the taskmanager folder:
   ```
   cd taskmanager
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to the URL provided by Vite (typically [http://localhost:5173](http://localhost:5173)).

## Important Development Decisions
- **Context API for State Management:** Authentication and Task state are managed via React Context APIs for simplicity.
- **Material UI:** Used for a consistent and responsive UI.
- **Vite as a Build Tool:** Chosen for fast development and hot reloading.
- **Express & MongoDB:** Standard MERN stack approach with RESTful API design.
- **Authentication Approach:** Simple authentication is implemented without JWTs. User details are stored in localStorage for session persistence(Frontend).

## Troubleshooting
- Ensure your MongoDB URI is correct and the database server is running.
- Check that the API server is up before starting the frontend.
- Review console logs for error messages if issues occur during task operations or authentication.
