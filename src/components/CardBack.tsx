import cardBack from "../assets/card-back.svg";
import cardBackImage from "../assets/card-back-image.svg";
import cardBackHover from "../assets/card-back-hover.svg";
import cardBackImageHover from "../assets/card-back-image-hover.svg";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function CardBack() {
  const [hover, setHover] = useState(false);

  return (
    <button
      className="relative cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AnimatePresence>
        {hover && (
          <motion.div
            className="absolute z-1"
            key="hoveredCardBack"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-[100px] h-[150px] rounded-[10px] bg-white flex items-center justify-center p-1.25 shadow-[0_2px_5px_rgba(0,0,0,0.25)]">
              <div className="relative">
                <img src={cardBackHover} alt="grey-background" />
                <img
                  className="absolute left-1/2 top-1/2 -translate-1/2 "
                  src={cardBackImageHover}
                  alt="green-question-mark"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-[100px] h-[150px] rounded-[10px] bg-white flex items-center justify-center p-1.25 shadow-[0_2px_1px_rgba(0,0,0,0.15)]">
        <div className="relative">
          <img src={cardBack} alt="grey-background" />
          <img
            className="absolute left-1/2 top-1/2 -translate-1/2 "
            src={cardBackImage}
            alt="grey-question-mark"
          />
        </div>
      </div>
    </button>
  );
}

export default CardBack;
