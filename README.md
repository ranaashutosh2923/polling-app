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

## Local Development

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

## Deployment Instructions

### Backend Deployment (Render)

1. **Create a Render account** at [render.com](https://render.com)
2. **Connect your GitHub repository** to Render
3. **Create a new Web Service**:
   - Choose your repository
   - Name: `polling-app-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add Environment Variable: `NODE_ENV = production`
4. **Deploy** and note your backend URL (e.g., `https://your-app.onrender.com`)

### Frontend Deployment (Vercel)

1. **Create a Vercel account** at [vercel.com](https://vercel.com)
2. **Import your GitHub repository** to Vercel
3. **Configure the project**:
   - Framework Preset: `Vite`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Add Environment Variable**:
   - Name: `VITE_SERVER_URL`
   - Value: Your backend URL from Render
5. **Deploy** and note your frontend URL

### Alternative: Netlify Deployment

1. **Create a Netlify account** at [netlify.com](https://netlify.com)
2. **Deploy from Git**:
   - Connect your repository
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Add Environment Variable**:
   - Key: `VITE_SERVER_URL`
   - Value: Your backend URL from Render

## Folder Structure

```
.
├── client
│   ├── public
│   │   ├── src
│   │   │   ├── components
│   │   │   │   ├── ChatBox.css
│   │   │   │   ├── ChatBox.jsx
│   │   │   │   ├── Student.css
│   │   │   │   ├── Student.jsx
│   │   │   │   ├── Teacher.css
│   │   │   │   └── Teacher.jsx
│   │   │   ├── App.css
│   │   │   ├── App.jsx
│   │   │   ├── main.jsx
│   │   │   └── socket.js
│   │   ├── .gitignore
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vercel.json
│   │   └── vite.config.js
│   └── server
│       ├── index.js
│       ├── package.json
│       └── render.yaml
```

## Important Notes for Deployment

- The backend URL must be updated in the frontend environment variables
- CORS is configured to allow connections from the deployed frontend
- WebSocket connections are supported for real-time communication
- The application uses in-memory storage (data resets on server restart) 