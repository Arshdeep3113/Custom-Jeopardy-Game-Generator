import { useState } from "react";
import HomePage from "./components/HomePage";
import SetupScreen from "./components/SetupScreen";
import GameBoard from "./components/GameBoard";

function App() {
  const [screen, setScreen] = useState("home");
  const [gameData, setGameData] = useState(null);

  function handleCreateGame(data) {
    setGameData(data);
    setScreen("game");
  }

  function handleBackHome() {
    setGameData(null);
    setScreen("home");
  }

  return (
    <div>
      {screen === "home" && (
        <HomePage onCreateClick={() => setScreen("setup")} />
      )}

      {screen === "setup" && (
        <SetupScreen onCreateGame={handleCreateGame} />
      )}

      {screen === "game" && (
        <GameBoard
          gameData={gameData}
          onBackHome={handleBackHome}
        />
      )}
    </div>
  );
}

export default App;