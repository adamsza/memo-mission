import { useGameContext } from "../context/GameConext"

export function HeaderInfo() {
    const gameState = useGameContext()
    return (
        <div className="w-fit h-fit grid grid-flow-col grid-rows-2 items-center">
            <div className="row-span-2 border-r-1 border-[#D5D5D5] px-3.75">
                <div className="text-[52px] text-[#FF3F56] font-gilroy-black">{gameState.remainingTime}</div>
            </div>
            <div className="border-b-1 border-[#D5D5D5] font-gilroy-bold text-lg px-3.75 pb-3.75">{gameState.matches} matches</div>
            <div className="font-gilroy-bold text-lg px-3.75 pt-3.75">{gameState.mistakes} mistakes</div>
        </div>
    )
}