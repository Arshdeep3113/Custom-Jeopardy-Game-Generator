import { useState } from "react";
import ScoreBoard from "./ScoreBoard";
import QuestionPopup from "./QuestionPopup";

function GameBoard({ gameData }) {
  const [teams, setTeams] = useState(gameData.teams);
  const [categories, setCategories] = useState(gameData.categories);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isStealTurn, setIsStealTurn] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [attemptNumber, setAttemptNumber] = useState(0);
  const allQuestionsUsed = categories.every((category) =>
    category.questions.every((question) => question.used)
  );

  const winner =
    teams[0].score > teams[1].score
      ? teams[0]
      : teams[1].score > teams[0].score
        ? teams[1]
        : null;

  function handleQuestionClick(categoryIndex, questionIndex) {
    const question = categories[categoryIndex].questions[questionIndex];
    if (question.used) return;

    setSelectedQuestion(question);
    setSelectedLocation({ categoryIndex, questionIndex });
    setIsStealTurn(false);
    setShowAnswer(false);
    setAttemptNumber(0);
  }

  function markQuestionUsed() {
    const updatedCategories = [...categories];

    updatedCategories[selectedLocation.categoryIndex].questions[
      selectedLocation.questionIndex
    ].used = true;

    setCategories(updatedCategories);
  }

  function closeQuestion() {
    setSelectedQuestion(null);
    setSelectedLocation(null);
    setIsStealTurn(false);
    setShowAnswer(false);
    setAttemptNumber(0);
  }

  function switchTeamForSteal() {
    setCurrentTeamIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    setIsStealTurn(true);
    setAttemptNumber((prev) => prev + 1);
  }

  function finishNoPoints() {
    markQuestionUsed();
    setShowAnswer(true);
  }

  function handleCorrect() {
    const updatedTeams = [...teams];
    updatedTeams[currentTeamIndex].score += Number(selectedQuestion.points);

    setTeams(updatedTeams);
    markQuestionUsed();
    closeQuestion();
  }

  function handleWrong() {
    if (!isStealTurn) {
      switchTeamForSteal();
    } else {
      finishNoPoints();
    }
  }

  function handleTimeout() {
    if (!isStealTurn) {
      switchTeamForSteal();
    } else {
      finishNoPoints();
    }
  }

  return (
    <div className="page">
      <div className="game-container">
        <div className="game-title">
          JEOPARDY
        </div>

        <ScoreBoard teams={teams} currentTeamIndex={currentTeamIndex} />

        {allQuestionsUsed && (
          <div className="game-over">
            {winner ? (
              <h2> Winning Team: {winner.name}</h2>
            ) : (
              <h2> Tie Game!</h2>
            )}
          </div>
        )}

        <div className="board">
          {categories.map((category, categoryIndex) => (
            <div className="category-column" key={categoryIndex}>
              <div className="category-header">{category.name}</div>

              {category.questions.map((question, questionIndex) => (
                <button
                  key={questionIndex}
                  className="point-card"
                  disabled={question.used}
                  onClick={() => handleQuestionClick(categoryIndex, questionIndex)}
                >
                  {question.used ? "✓" : question.points}
                </button>
              ))}
            </div>
          ))}
        </div>

        <QuestionPopup
          selectedQuestion={selectedQuestion}
          timerSeconds={gameData.timerSeconds}
          currentTeamName={teams[currentTeamIndex].name}
          isStealTurn={isStealTurn}
          showAnswer={showAnswer}
          attemptNumber={attemptNumber}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          onTimeout={handleTimeout}
          onClose={closeQuestion}
        />
      </div>
    </div>
  );
}

export default GameBoard;