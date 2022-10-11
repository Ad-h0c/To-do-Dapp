import { Link } from "react-router-dom";
import ConnectWallet from "./connectWallet";

const Header = () => {
  const [currentAccount, connectWallet, disconnectWallet] = ConnectWallet();
  return (
    // NavBar
    <div className="flex flex-col items-center container">
      <nav className="flex border-2 rounded-b border-transparent md:w-[65rem] mb-20 justify-between p-4">
        {/* Logo */}
        <div className="logo flex flex-row justify-between md:pt-2">
          <Link
            to="/"
            className="md:font-Orb font-extrabold md:tracking-wider text-Orange tracking-normal text-lg  py-1 mr-4 md:text-2xl"
          >
            || Todo App ||
          </Link>
        </div>
        {/* Connect Wallet */}
        {!currentAccount ? (
          <button
            className="p-0.5 h-8 md:h-11 mx-0.5 w-40 border-2 text-sm rounded-full md:rounded-full border-Orange text-Orange font-bold md:mr-4 hover:scale-110 md:w-56 md:text-lg md:p-2"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        ) : (
          <div className="dropdown">
            <button className="p-2 w-40 h-8 rounded-full text-sm truncate font-bold bg-black text-white relative md:w-56 md:text-lg md:h-auto md:mr-4">
              {currentAccount}
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};
export default Header;
