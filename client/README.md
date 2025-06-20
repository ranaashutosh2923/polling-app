# Live Polling System

This is a full-stack Live Polling System with a React frontend and an Express + Socket.IO backend.

## Features

*   **Teacher Role:**
    *   Create new polls with questions and options.
    *   Set a timer for each poll.
    *   View live results of the poll.
    *   End the poll and see the final results.
    *   View a list of connected students and kick them.
    *   View a history of past polls.
    *   Chat with students.
*   **Student Role:**
    *   Enter their name to join the poll.
    *   Receive poll questions in real-time.
    *   Submit one answer per poll.
    *   View live results after the poll has ended.
    *   Chat with the teacher.

## Tech Stack

*   **Frontend:** React, Vite, Socket.IO Client
*   **Backend:** Node.js, Express, Socket.IO

## How to Run the Application

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd live-polling-system
    ```
3.  **Install server dependencies:**
    ```bash
    cd server
    npm install
    ```
4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:4000`.

5.  **Install client dependencies:**
    ```bash
    cd ../client
    npm install
    ```
6.  **Start the client:**
    ```bash
    npm run dev
    ```
    The client will be running on `http://localhost:5173`.

7.  **Open the application in your browser:**
    Open your browser and go to `http://localhost:5173`.

## Folder Structure

```
.
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   │   ├── ChatBox.css
│   │   │   ├── ChatBox.jsx
│   │   │   ├── Student.css
│   │   │   ├── Student.jsx
│   │   │   ├── Teacher.css
│   │   │   └── Teacher.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── socket.js
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── server
    ├── index.js
    ├── package.json
```
