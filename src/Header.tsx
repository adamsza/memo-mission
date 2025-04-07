import logo from "./assets/logo.svg";
import { HeaderInfo } from "./components/HeaderInfo";
import { Menu } from "./components/Menu";
import useWindowSize from "./hooks/UseWindowSize";


export function Header() {
    const windowSize = useWindowSize();

    return (
        <>
            {windowSize > 780 ?
                <div className="grid justify-between grid-flow-col items-center">
                    <img src={logo} />
                    <HeaderInfo />
                    <Menu/>
                </div>
                :
                <div>
                    <div className="grid justify-end grid-flow-col items-center">
                        <img src={logo} />
                        <Menu/>
                    </div>
                    <div className="flex justify-center">
                        <HeaderInfo />
                    </div>
                </div>
            }
        </>
    )
}