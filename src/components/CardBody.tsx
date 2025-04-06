import Card from "./Card";
import CardBack from "./CardBack";
import CardFront from "./CardFront";

interface CardProps {
    card: Card,
    onClick: (id: number) =>  void
}

function CardBody(props: CardProps) {

    return (
        <div className="flex justify-center" onClick={() => props.onClick(props.card.id)}>
            {props.card.flipped ? <CardFront>{props.card.emoji}</CardFront> : <CardBack/>}
        </div>
    )
}

export default CardBody