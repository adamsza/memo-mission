import CardBody from "./components/CardBody"
import { useGameContext } from "./context/GameContext";

function GameBoard() {
    const {cards, handleCardClick} = useGameContext();

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 bg-[#F5F5F5] py-18.75 px-6.25 rounded-[50px]">
            {cards.map(card => <CardBody key={card.id} card={card} onClick={handleCardClick} />)}
        </div>
    )
}

export default GameBoard