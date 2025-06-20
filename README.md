# 🗳️ Live Polling System

A real-time, full-stack polling application that enables interactive classroom engagement through live polls, instant results, and real-time communication between teachers and students.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7.5-010101?style=for-the-badge&logo=socket.io)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite)
![Express](https://img.shields.io/badge/Express-4.19.2-000000?style=for-the-badge&logo=express)

## ✨ Features

### 👨‍🏫 Teacher Dashboard
- **Create Interactive Polls**: Design custom questions with multiple choice options
- **Timer Management**: Set customizable countdown timers (10-300 seconds) for each poll
- **Real-time Results**: View live voting results as students submit answers
- **Student Management**: Monitor connected students and kick disruptive participants
- **Poll History**: Access complete history of all conducted polls with detailed results
- **Live Chat**: Communicate with students in real-time during sessions
- **Manual/Auto End**: End polls manually or let them auto-complete when timer expires

### 👨‍🎓 Student Interface
- **Easy Join Process**: Enter name once and join polling sessions seamlessly
- **Real-time Polls**: Receive polls instantly when teacher starts them
- **One Vote Per Poll**: Submit single answer per poll to prevent multiple submissions
- **Live Results**: View results immediately after poll completion
- **Interactive Chat**: Communicate with teacher and other students
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 🔧 Technical Features
- **WebSocket Communication**: Real-time bidirectional communication
- **Session Management**: Persistent user sessions with browser storage
- **CORS Configuration**: Secure cross-origin resource sharing
- **Production Ready**: Optimized for deployment with environment variables
- **Modern UI/UX**: Clean, intuitive interface with modern design patterns

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern UI library with hooks and functional components
- **Vite 5.2.0** - Fast build tool and development server
- **Socket.IO Client 4.7.5** - Real-time communication library
- **React Router DOM 6.23.1** - Client-side routing
- **CSS3** - Modern styling with responsive design

### Backend
- **Node.js** - JavaScript runtime environment
- **Express 4.19.2** - Web application framework
- **Socket.IO 4.7.5** - Real-time bidirectional communication
- **CORS 2.8.5** - Cross-origin resource sharing middleware

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Git** - Version control system

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/polling-app.git
   cd polling-app
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:4000`

4. **Install frontend dependencies** (in a new terminal)
   ```bash
   cd ../client
   npm install
   ```

5. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

6. **Open your browser** and navigate to `http://localhost:5173`

## 🌐 Deployment

### Backend Deployment (Render)

1. **Create a Render account** at [render.com](https://render.com)
2. **Connect your GitHub repository**
3. **Create a new Web Service**:
   - **Repository**: Select your polling-app repository
   - **Name**: `polling-app-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`
4. **Add Environment Variables**:
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: Your frontend URL (e.g., `https://your-app.vercel.app`)
5. **Deploy** and note your backend URL

### Frontend Deployment (Vercel)

1. **Create a Vercel account** at [vercel.com](https://vercel.com)
2. **Import your GitHub repository**
3. **Configure the project**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Add Environment Variable**:
   - **Name**: `VITE_SERVER_URL`
   - **Value**: Your backend URL from Render
5. **Deploy** and note your frontend URL

### Alternative: Netlify Deployment

1. **Create a Netlify account** at [netlify.com](https://netlify.com)
2. **Deploy from Git**:
   - Connect your repository
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. **Add Environment Variable**:
   - **Key**: `VITE_SERVER_URL`
   - **Value**: Your backend URL from Render

## 📁 Project Structure

```
polling-app/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   │   ├── src
│   │   │   ├── components
│   │   │   │   ├── ChatBox.css         # Chat component styles
│   │   │   │   ├── ChatBox.jsx         # Real-time chat component
│   │   │   │   ├── Student.css         # Student view styles
│   │   │   │   ├── Student.jsx         # Student interface
│   │   │   │   ├── Teacher.css         # Teacher view styles
│   │   │   │   └── Teacher.jsx         # Teacher dashboard
│   │   │   ├── App.css                 # Global styles
│   │   │   ├── App.jsx                 # Main application component
│   │   │   ├── main.jsx                # Application entry point
│   │   │   └── socket.js               # Socket.IO client configuration
│   │   ├── index.html                  # HTML template
│   │   ├── package.json                # Frontend dependencies
│   │   ├── vercel.json                 # Vercel deployment config
│   │   └── vite.config.js              # Vite configuration
│   └── server
│       ├── index.js                    # Express server with Socket.IO
│       └── package.json                # Backend dependencies
├── render.yaml                      # Render deployment configuration
└── README.md                       # Project documentation
```

## 🔧 Configuration

### Environment Variables

#### Backend (Server)
- `NODE_ENV`: Set to `production` for deployed environments
- `CLIENT_URL`: Frontend URL for CORS configuration
- `PORT`: Server port (defaults to 4000)

#### Frontend (Client)
- `VITE_SERVER_URL`: Backend server URL for Socket.IO connection

## 🧪 Testing the Application

1. **Open the application** in multiple browser tabs/windows
2. **Teacher Setup**:
   - In one tab, select "Teacher" role
   - Create a poll with a 30-second timer
   - Add multiple choice options
3. **Student Participation**:
   - In other tabs, select "Student" role
   - Enter different names for each student
   - Watch polls appear in real-time
   - Submit answers and observe live results
4. **Test Features**:
   - Verify real-time chat functionality
   - Test the "kick student" feature
   - Check poll history after completion
   - Verify timer countdown and auto-end

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ashutosh Rana**
- GitHub: [@ranaashutosh2923](https://github.com/ranaashutosh2923)

## 🙏 Acknowledgments

- Socket.IO for real-time communication capabilities
- React team for the amazing frontend framework
- Vite for the fast build tool
- Express.js for the robust backend framework

---

⭐ **Star this repository if you found it helpful!** 