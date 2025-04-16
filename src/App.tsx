import { useState } from 'react';
import { Header } from './Header'
import SettingsModal from './components/SettingsModal';
import GameBoard from './GameBoard';
import Game from './Game';
import { Provider } from 'react-redux';
import { store } from './stores/store';

function App() {
  const [modal, setModal] = useState(false);

  return (
    <div className="flex flex-col gap-7.5 pt-7.5 pb-12.5 px-12.5">
      <Provider store={store}>
        <Game>
          <Header openSettings={() => setModal(true)} />
          <GameBoard />
        </Game>
        {modal && <SettingsModal handleClose={() => setModal(false)} />}
      </Provider>
    </div>
  )
}

export default App