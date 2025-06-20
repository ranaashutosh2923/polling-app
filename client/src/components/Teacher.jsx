import { useEffect, useState } from "react";
import { socket } from "../socket";
import ChatBox from "./ChatBox";
import "./Teacher.css";

function Teacher() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [pollStarted, setPollStarted] = useState(false);
  const [results, setResults] = useState(null);
  const [students, setStudents] = useState([]);
  const [pollHistory, setPollHistory] = useState([]);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    socket.auth = { role: "teacher" };
    socket.connect();

    socket.on("connect", () => {
      console.log("🟢 Connected as teacher:", socket.id);
    });

    socket.on("pollResults", (resultData) => {
      setResults(resultData.results);
      setPollStarted(false);
      setQuestion("");
      setOptions(["", ""]);
    });

    socket.on("studentList", (studentList) => {
      setStudents(studentList);
    });

    socket.on("pollHistory", (history) => {
      setPollHistory(history);
    });

    return () => {
      socket.off("connect");
      socket.off("pollResults");
      socket.off("studentList");
      socket.off("pollHistory");
    };
  }, []);

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const updated = [...options];
    updated.splice(index, 1);
    setOptions(updated);
  };

  const startPoll = () => {
    const trimmedOptions = options.map((opt) => opt.trim()).filter((opt) => opt !== "");
    if (question.trim() && trimmedOptions.length >= 2) {
      socket.emit("startPoll", {
        question: question.trim(),
        options: trimmedOptions,
        timer: timer,
      });
      setPollStarted(true);
      setResults(null);
    } else {
      alert("Please enter a question and at least 2 options.");
    }
  };

  const endPoll = () => {
    socket.emit("endPoll");
  };

  const kickStudent = (id) => {
    socket.emit("kickStudent", { id });
  };

  return (
    <div className="teacher-dashboard">
      <div className="poll-controls">
        <h2>Poll Controls</h2>
        {!pollStarted ? (
          <>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question"
            />
            {options.map((opt, index) => (
              <div key={index} className="option-input">
                <input
                  type="text"
                  value={opt}
                  placeholder={`Option ${index + 1}`}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                {options.length > 2 && (
                  <button onClick={() => removeOption(index)}>X</button>
                )}
              </div>
            ))}
            <button onClick={addOption}>+ Add Option</button>
            <div style={{ marginTop: "20px" }}>
              <label>Timer (seconds): </label>
              <input
                type="number"
                value={timer}
                onChange={(e) => setTimer(parseInt(e.target.value))}
                min="10"
                style={{ width: "80px", marginLeft: "10px" }}
              />
            </div>
            <button onClick={startPoll} style={{ marginTop: "20px" }}>
              Start Poll
            </button>
          </>
        ) : (
          <>
            <p>✅ Poll started! Waiting for submissions...</p>
            <button onClick={endPoll}>End Poll & Show Results</button>
          </>
        )}
        {results && (
          <div className="results-container">
            <h3>📊 Poll Results:</h3>
            <ul className="results-list">
              {Object.entries(results).map(([opt, count], idx) => (
                <li key={idx} className="result-item">
                  <span className="option">{opt}</span>
                  <span className="count">{count} vote(s)</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="student-management">
        <h2>Student Management</h2>
        <ul className="student-list">
          {students.map(({ id, name }) => (
            <li key={id} className="student-item">
              <span>{name}</span>
              <button onClick={() => kickStudent(id)} className="kick-button">
                Kick
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="poll-history">
        <h2>Past Poll History</h2>
        {pollHistory.length === 0 ? (
          <p>No polls conducted yet.</p>
        ) : (
          <ul className="history-list">
            {pollHistory.map((poll, index) => (
              <li key={index} className="history-item">
                <h4>
                  Q{index + 1}: {poll.question}
                </h4>
                <ul>
                  {Object.entries(poll.results).map(([opt, count], i) => (
                    <li key={i}>
                      {opt}: {count} vote(s)
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ChatBox userName="Teacher" role="teacher" />
    </div>
  );
}

export default Teacher;
