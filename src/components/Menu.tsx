import { faGear, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGameContext } from "../context/GameContext";

export function Menu({ openSettings }: { readonly openSettings: () => void }) {
  const gameState = useGameContext();
  return (
    <div className="w-fit">
      <FontAwesomeIcon
        className="text-[#D5D5D5] text-2xl p-2.5 pr-5 border-r-1 border-[#D5D5D5] cursor-pointer"
        icon={faGear}
        onClick={openSettings}
      />
      <FontAwesomeIcon
        className="text-[#D5D5D5] text-2xl p-2.5 pl-5 cursor-pointer"
        icon={faRepeat}
        onClick={gameState.restartGame}
      />
    </div>
  );
}
