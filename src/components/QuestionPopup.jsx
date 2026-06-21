import { useState, useEffect } from "react";

function QuestionPopup({
  selectedQuestion,
  timerSeconds,
  currentTeamName,
  isStealTurn,
  showAnswer,
  attemptNumber,
  onCorrect,
  onWrong,
  onTimeout,
  onClose,
}) {
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  const percentageLeft = (timeLeft / timerSeconds) * 100;

  useEffect(() => {
    setTimeLeft(timerSeconds);
    setHasTimedOut(false);
  }, [selectedQuestion, timerSeconds, attemptNumber]);

  useEffect(() => {
    if (!selectedQuestion || showAnswer || hasTimedOut) return;

    if (timeLeft <= 0) {
      setHasTimedOut(true);
      onTimeout();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, selectedQuestion, showAnswer, hasTimedOut, onTimeout]);

  if (!selectedQuestion) return null;

  return (
    <div className="modal-background">
      <div className="modal">
        <h2>{isStealTurn ? "Steal Attempt" : "Question"}</h2>

        <h3>Team Answering: {currentTeamName}</h3>

        {!showAnswer && (
          <div className="timer-box">
            <h3 className={timeLeft <= 5 ? "timer danger" : "timer"}>
              Time Left: {timeLeft}s
            </h3>

            <div className="timer-bar-background">
              <div
                className={timeLeft <= 5 ? "timer-bar danger-bar" : "timer-bar"}
                style={{ width: `${percentageLeft}%` }}
              ></div>
            </div>
          </div>
        )}

        <p>{selectedQuestion.question}</p>

        {!showAnswer && (
          <>
            <button onClick={onCorrect}>Correct</button>
            <button onClick={onWrong}>Incorrect</button>
          </>
        )}

        {showAnswer && (
          <>
            <h2>Correct Answer</h2>
            <p>{selectedQuestion.answer}</p>
            <button onClick={onClose}>Close Question</button>
          </>
        )}
      </div>
    </div>
  );
}

export default QuestionPopup;