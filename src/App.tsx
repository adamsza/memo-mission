import { useState } from 'react';
import { Header } from './Header'
import SettingsModal from './components/SettingsModal';
import GameBoard from './GameBoard';
import Game, { GameSettings } from './Game';

function App() {
  const [gameSettings, setGameSettings] = useState<GameSettings>({ cards: 12, time: 60 })
  const [modal, setModal] = useState(false);

  return (
    <div className="pt-7.5 pb-12.5 px-12.5">
      <Game gameSettings={gameSettings}>
        <Header openSettings={() => setModal(true)}/>
        <GameBoard />
      </Game>
      {modal && <SettingsModal
        handleClose={() => setModal(false)}
        gameSettings={gameSettings}
        changeSettings={(newGameSettings) => {
          setGameSettings(newGameSettings);
          setModal(false);
        }} />}
    </div>
  )
}

export default App