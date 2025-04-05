import cardBackHover from "../assets/card-back-hover.svg";
import cardBackImageHover from "../assets/card-back-image-hover.svg";

function CardBackHover() {

    return (
        <div className="w-[100px] h-[150px] rounded-[10px] bg-white flex items-center justify-center p-1.25 shadow-[0_2px_5px_rgba(0,0,0,0.25)]">
            <div className="relative">
                <embed src={cardBackHover} />
                <embed className="absolute left-1/2 top-1/2 -translate-1/2 " src={cardBackImageHover} />
            </div>
        </div>
    )
}

export default CardBackHover