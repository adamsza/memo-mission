import logo from "./assets/logo.svg";
import { HeaderInfo } from "./components/HeaderInfo";
import { Menu } from "./components/Menu";
import useWindowSize from "./hooks/useWindowSize";

export function Header({
  openSettings,
}: {
  readonly openSettings: () => void;
}) {
  const windowSize = useWindowSize();

  return (
    <>
      {windowSize > 780 ? (
        <div className="grid justify-between grid-flow-col items-center">
          <img src={logo} alt="logo" />
          <HeaderInfo />
          <Menu openSettings={openSettings} />
        </div>
      ) : (
        <div>
          <div className="grid justify-between grid-flow-col items-center">
            <img src={logo} alt="logo" />
            <Menu openSettings={openSettings} />
          </div>
          <div className="flex justify-center">
            <HeaderInfo />
          </div>
        </div>
      )}
    </>
  );
}
