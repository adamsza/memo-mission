import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { changeName } from "../stores/userSlice";
import { changeSettings } from "../stores/gameSlice";

interface SettingsModalProps {
    handleClose: () => void
}

function SettingsModal(props: SettingsModalProps) {
    const settings = useSelector((state: RootState) => state.game.settings);
    const [cards, setCards] = useState(settings.cards);
    const [time, setTime] = useState(settings.time);
    const [maxMistakes, setMaxMistakes] = useState(settings.maxMistakes);
    const name = useSelector((state: RootState) => state.user.name);
    const dispatch = useDispatch();

    return (
        <div className="fixed top-0 left-0 w-lvw h-lvh bg-backdrop z-10">
            <div className="flex flex-col w-[300px] h-[350px] m-auto mt-15 rounded-[35px] bg-white overflow-hidden">
                <div className="flex justify-between items-center bg-[#F5F5F5] py-6.25 px-5">
                    <div className="font-gilroy-black text-2xl leading-4.25 text-black">Game settings</div>
                    <FontAwesomeIcon className="text-[#D5D5D5] text-2xl px-1.25" icon={faTimes} onClick={props.handleClose} />
                </div>
                <div className="h-full flex flex-col justify-between p-5">
                    <div className="flex justify-between items-center">
                        <div className="font-gilroy-bold text-lg text-black">Name</div>
                        <input className="h-10.25 box-border py-2.5 border-1 border-[#D5D5D5] rounded-[10px] font-gilroy text-lg text-center text-black"
                            value={name} onChange={(e) => dispatch(changeName(e.currentTarget.value))} />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-gilroy-bold text-lg text-black">Number of pair of cards</div>
                        <input className="w-12.5 h-10.25 box-border py-2.5 border-1 border-[#D5D5D5] rounded-[10px] font-gilroy text-lg text-center text-black"
                            value={cards} onChange={(e) => setCards(parseInt(e.currentTarget.value) || 0)} />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-gilroy-bold text-lg text-black">Countdown time (sec.)</div>
                        <input className="w-12.5 h-10.25 box-border py-2.5 border-1 border-[#D5D5D5] rounded-[10px] font-gilroy text-lg text-center text-black"
                            value={time} onChange={(e) => setTime(parseInt(e.currentTarget.value) || 0)} />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-gilroy-bold text-lg text-black">Allowed bad guesses</div>
                        <input className="w-12.5 h-10.25 box-border py-2.5 border-1 border-[#D5D5D5] rounded-[10px] font-gilroy text-lg text-center text-black"
                            value={maxMistakes} onChange={(e) => setMaxMistakes(parseInt(e.currentTarget.value) || 0)} />
                    </div>
                    <button className="w-full bg-[#FF3F56] rounded-[30px] py-3.75 px-5 text-white uppercase font-gilroy-bold text-[16px]"
                        onClick={() => {
                            dispatch(changeSettings({ cards: cards, time: time, maxMistakes: maxMistakes }));
                            props.handleClose();
                        }}>Save settings</button>
                </div>
            </div>
        </div>
    )
}

export default SettingsModal