import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SettingsModal() {
    return (
        <div className="fixed top-0 left-0 w-lvw h-lvh bg-backdrop">
            <div className="flex flex-col w-[300px] h-[275px] m-auto mt-15 rounded-[35px] bg-white overflow-hidden">
                <div className="flex justify-between items-center bg-[#F5F5F5] py-6.25 px-5">
                    <div className="font-gilroy-black text-2xl leading-4.25">Game settings</div>
                    <FontAwesomeIcon className="text-[#D5D5D5] text-2xl px-1.25" icon={faTimes} />
                </div>
                <div className="h-full flex flex-col justify-between p-5">
                    <div className="flex justify-between items-center">
                        <div className="font-gilroy-bold text-lg">Number of pair of cards</div>
                        <input className="w-12.5 h-10.25 box-border py-2.5 border-1 border-[#D5D5D5] rounded-[10px] font-gilroy text-lg" />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-gilroy-bold text-lg">Countdown time (sec.)</div>
                        <input className="w-12.5 h-10.25 box-border py-2.5 border-1 border-[#D5D5D5] rounded-[10px] font-gilroy text-lg" />
                    </div>
                    <button className="w-full bg-[#FF3F56] rounded-[30px] py-3.75 px-5 text-white uppercase font-gilroy-bold text-[16px]">Save settings</button>
                </div>
            </div>
        </div>
    )
}

export default SettingsModal