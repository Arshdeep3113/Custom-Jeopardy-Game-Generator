import { useState } from "react";

function SetupScreen({ onCreateGame }) {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(30);

  const [categories, setCategories] = useState([
    {
      name: "",
      questions: [{ question: "", answer: "", points: "", used: false }],
    },
  ]);

  function addCategory() {
    setCategories([
      ...categories,
      {
        name: "",
        questions: [{ question: "", answer: "", points: "", used: false }],
      },
    ]);
  }

  function addQuestion(categoryIndex) {
    const updatedCategories = [...categories];

    updatedCategories[categoryIndex].questions.push({
      question: "",
      answer: "",
      points: "",
      used: false,
    });

    setCategories(updatedCategories);
  }

  function updateCategoryName(categoryIndex, value) {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].name = value;
    setCategories(updatedCategories);
  }

  function updateQuestion(categoryIndex, questionIndex, field, value) {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].questions[questionIndex][field] = value;
    setCategories(updatedCategories);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const gameData = {
      timerSeconds: Number(timerSeconds) || 30,

      teams: [
        { name: team1 || "Team 1", score: 0 },
        { name: team2 || "Team 2", score: 0 },
      ],

      categories: categories.map((category) => ({
        name: category.name || "Untitled Category",
        questions: category.questions.map((q) => ({
          question: q.question,
          answer: q.answer,
          points: Number(q.points) || 0,
          used: false,
        })),
      })),
    };

    onCreateGame(gameData);
  }

  return (
    <div className="page">
      <h1>Create Your Game</h1>

      <form onSubmit={handleSubmit}>
        <h2>Teams</h2>

        <input
          type="text"
          placeholder="Team 1 name"
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
        />

        <input
          type="text"
          placeholder="Team 2 name"
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
        />

        <h2>Timer</h2>

        <input
          type="number"
          placeholder="Timer in seconds"
          value={timerSeconds}
          onChange={(e) => setTimerSeconds(e.target.value)}
        />

        <h2>Categories</h2>

        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="category-box">
            <h3>Category {categoryIndex + 1}</h3>

            <input
              type="text"
              placeholder="Category name"
              value={category.name}
              onChange={(e) =>
                updateCategoryName(categoryIndex, e.target.value)
              }
            />

            {category.questions.map((q, questionIndex) => (
              <div key={questionIndex} className="question-box">
                <h4>Question {questionIndex + 1}</h4>

                <input
                  type="text"
                  placeholder="Question"
                  value={q.question}
                  onChange={(e) =>
                    updateQuestion(
                      categoryIndex,
                      questionIndex,
                      "question",
                      e.target.value
                    )
                  }
                />

                <input
                  type="text"
                  placeholder="Answer"
                  value={q.answer}
                  onChange={(e) =>
                    updateQuestion(
                      categoryIndex,
                      questionIndex,
                      "answer",
                      e.target.value
                    )
                  }
                />

                <input
                  type="number"
                  placeholder="Points"
                  value={q.points}
                  onChange={(e) =>
                    updateQuestion(
                      categoryIndex,
                      questionIndex,
                      "points",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}

            <button type="button" onClick={() => addQuestion(categoryIndex)}>
              Add Question
            </button>
          </div>
        ))}

        <button type="button" onClick={addCategory}>
          Add Category
        </button>

        <button type="submit">Create Game</button>
      </form>
    </div>
  );
}

export default SetupScreen;