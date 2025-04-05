import { faGear, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Menu() {
    return (
        <div className="w-fit">
            <FontAwesomeIcon className="text-[#D5D5D5] text-2xl p-2.5 pr-5 border-r-1 border-[#D5D5D5]" icon={faGear} />
            <FontAwesomeIcon className="text-[#D5D5D5] text-2xl p-2.5 pl-5" icon={faRepeat} />
        </div>
    )
}