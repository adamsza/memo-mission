import { AnimatePresence, motion } from "motion/react";
import Card from "../types/Card";
import CardBack from "./CardBack";
import CardFront from "./CardFront";

interface CardProps {
    card: Card,
    onClick: (id: number) => void
}

function CardBody(props: CardProps) {

    return (
        <div className="flex justify-center h-[150px] w-[100px]" onClick={() => props.onClick(props.card.id)}>
            <AnimatePresence>
                {props.card.flipped ?
                    <motion.div
                        className="absolute z-1"
                        key="cardFront"
                        initial={{ opacity: 0, scaleX: 0.5, translateX: "-25px" }}
                        animate={{ opacity: 1, scaleX: 1, translateX: "0px" }}
                        exit={{ opacity: 0, scaleX: 0.5, translateX: "-25px" }}
                        transition={{duration: 0.2}}>
                        <CardFront>{props.card.emoji}</CardFront>
                    </motion.div>
                    :
                    <motion.div
                        key="cardBack"
                        initial={{ opacity: 0, scaleX: 0.5, translateX: "25px" }}
                        animate={{ opacity: 1, scaleX: 1, translateX: "0px" }}
                        exit={{ opacity: 0, scaleX: 0.5, translateX: "25px" }}
                        transition={{duration: 0.2}}>
                        <CardBack />
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default CardBody