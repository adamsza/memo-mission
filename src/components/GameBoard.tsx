import { useSelector } from "react-redux";
import CardBody from "./CardBody"
import { useGameContext } from "../context/GameContext";
import { RootState } from "../stores/store";

function GameBoard() {
    const { handleCardClick } = useGameContext();
    const cards = useSelector((state: RootState) => state.game.cards);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4 bg-[#F5F5F5] py-18.75 px-6.25 rounded-[50px]">
            {cards.map(card =>
                <div className="flex justify-center" key={card.id}>
                    <CardBody card={card} onClick={handleCardClick} />
                </div>)}
        </div>
    )
}

export default GameBoard