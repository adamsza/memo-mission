import { useSelector } from "react-redux";
import { RootState } from "../stores/store";

export function HeaderInfo() {
    const { mistakes, foundCards, settings, elapsedTime } = useSelector((state: RootState) => state.game);
    return (
        <div className="w-fit h-fit grid grid-flow-col grid-rows-2 items-center">
            <div className="row-span-2 border-r-1 border-[#D5D5D5] px-3.75">
                <div className="text-[52px] text-[#FF3F56] font-gilroy-black">{settings.time-elapsedTime}</div>
            </div>
            <div className="border-b-1 border-[#D5D5D5] font-gilroy-bold text-lg px-3.75 pb-3.75">{foundCards.length / 2} matches</div>
            <div className="font-gilroy-bold text-lg px-3.75 pt-3.75">{mistakes} mistakes</div>
        </div>
    )
}