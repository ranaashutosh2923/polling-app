// src/App.jsx
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Student from "./components/Student";
import Teacher from "./components/Teacher";

function Home() {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    if (role === "student") {
      navigate("/student");
    } else if (role === "teacher") {
      navigate("/teacher");
    }
  };

  return (
    <div className="container">
      <h1>Welcome to the Live Polling System</h1>
      <p>Please select your role to continue.</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
        <button onClick={() => handleSelect("student")}>
          I am a Student
        </button>
        <button onClick={() => handleSelect("teacher")}>
          I am a Teacher
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
