import cardBack from "../assets/card-back.svg";
import cardBackImage from "../assets/card-back-image.svg";
import cardBackHover from "../assets/card-back-hover.svg";
import cardBackImageHover from "../assets/card-back-image-hover.svg";
import { useState } from "react";


function CardBack() {
    const [hover, setHover] = useState(false);

    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {hover ?
                <div className="w-[100px] h-[150px] rounded-[10px] bg-white flex items-center justify-center p-1.25 shadow-[0_2px_5px_rgba(0,0,0,0.25)]">
                    <div className="relative">
                        <img src={cardBackHover}/>
                        <img className="absolute left-1/2 top-1/2 -translate-1/2 " src={cardBackImageHover} />
                    </div>
                </div>
                :
                <div className="w-[100px] h-[150px] rounded-[10px] bg-white flex items-center justify-center p-1.25 shadow-[0_2px_1px_rgba(0,0,0,0.15)]">
                    <div className="relative">
                        <img src={cardBack}/>
                        <img className="absolute left-1/2 top-1/2 -translate-1/2 " src={cardBackImage} />
                    </div>
                </div>
            }
        </div>
    )
}

export default CardBack