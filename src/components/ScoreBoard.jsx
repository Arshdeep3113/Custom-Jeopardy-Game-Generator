function ScoreBoard({ teams, currentTeamIndex }) {
  return (
    <div className="scoreboard">
      <div>
        <h2>{teams[0].name}</h2>
        <p>{teams[0].score}</p>
      </div>

      <div>
        <h2>{teams[1].name}</h2>
        <p>{teams[1].score}</p>
      </div>

      <h3 className="current-turn">
        Current Team: {teams[currentTeamIndex].name}
      </h3>
    </div>
  );
}

export default ScoreBoard;