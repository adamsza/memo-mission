import cardBack from "../assets/card-back.svg";
import cardBackImage from "../assets/card-back-image.svg";

function CardBack() {

    return (
        <div className="w-[100px] h-[150px] rounded-[10px] bg-white flex items-center justify-center p-1.25 shadow-[0_2px_1px_rgba(0,0,0,0.15)]">
            <div className="relative">
                <embed src={cardBack} />
                <embed className="absolute left-1/2 top-1/2 -translate-1/2 " src={cardBackImage} />
            </div>
        </div>
    )
}

export default CardBack