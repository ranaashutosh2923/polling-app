import { useEffect, useState } from "react";
import { socket } from "../socket";
import ChatBox from "./ChatBox";
import "./Student.css";

function Student() {
  const [name, setName] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [poll, setPoll] = useState(null);
  const [lastPoll, setLastPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [results, setResults] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Connected as student:", socket.id);
    });

    socket.on("kicked", () => {
      alert("🚫 You have been kicked by the teacher.");
      socket.disconnect();
      window.location.href = "/";
    });

    socket.on("pollStarted", (pollData) => {
      console.log("📥 Poll received:", pollData);
      setPoll(pollData);
      setSubmitted(false);
      setSelectedOption("");
      setSecondsLeft(pollData.timer || 0);
      setResults(null);

      if (pollData.timer) {
        const countdown = setInterval(() => {
          setSecondsLeft((prev) => {
            if (prev <= 1) {
              clearInterval(countdown);
              if (!submitted) {
                setSubmitted(true);
              }
            }
            return prev - 1;
          });
        }, 1000);
      }
    });

    socket.on("pollResults", (resultData) => {
      console.log("📊 Results received:", resultData);
      setResults(resultData.results);
      setLastPoll(poll);
      setPoll(null);
    });

    return () => {
      socket.off("connect");
      socket.off("kicked");
      socket.off("pollStarted");
      socket.off("pollResults");
    };
  }, [submitted, poll]);

  const handleJoin = () => {
    const studentName = name.trim();
    if (studentName) {
      sessionStorage.setItem("studentName", studentName);
      connectSocket(studentName);
      setIsJoined(true);
    } else {
      alert("Please enter your name.");
    }
  };

  const connectSocket = (studentName) => {
    if (socket.connected) {
      socket.disconnect();
    }
    socket.auth = { role: "student", name: studentName };
    socket.connect();
  };

  const handleSubmit = () => {
    if (!selectedOption) return alert("Please select an option.");
    socket.emit("submitAnswer", {
      student: name,
      choice: selectedOption,
    });
    setSubmitted(true);
  };

  if (!isJoined) {
    return (
      <div className="student-container">
        <div className="name-prompt">
          <h2>Enter Your Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
          />
          <button onClick={handleJoin}>Join Poll</button>
        </div>
      </div>
    );
  }

  return (
    <div className="student-container">
      <h2>Welcome, {name}</h2>

      {!poll && !results && <p>Waiting for the teacher to start a poll...</p>}

      {poll && !results && (
        <div className="poll-question">
          <h3>{poll.question}</h3>
          <ul className="options-list">
            {poll.options.map((opt, idx) => (
              <li key={idx} className="option-item">
                <label>
                  <input
                    type="radio"
                    name="option"
                    value={opt}
                    disabled={submitted}
                    checked={selectedOption === opt}
                    onChange={() => setSelectedOption(opt)}
                  />
                  {` ${opt}`}
                </label>
              </li>
            ))}
          </ul>
          {!submitted ? (
            <>
              <button onClick={handleSubmit}>Submit</button>
              {secondsLeft > 0 && <p className="timer">Time left: {secondsLeft}s</p>}
            </>
          ) : (
            <p>✅ Answer submitted! Waiting for results...</p>
          )}
        </div>
      )}

      {results && (
        <div className="results-container">
          <h3>📊 Poll Results for "{lastPoll?.question}"</h3>
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

      <ChatBox userName={name} role="student" />
    </div>
  );
}

export default Student;