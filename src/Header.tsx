import logo from "./assets/logo.svg";
import { HeaderInfo } from "./components/HeaderInfo";
import { Menu } from "./components/Menu";

export function Header() {
    return (
        <div className="grid justify-between grid-flow-col">
            <img src={logo} />
            <HeaderInfo/>
            <Menu/>
        </div>
    )
}