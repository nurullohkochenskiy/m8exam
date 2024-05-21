import React, { useState } from "react";
import Watchlist from "../Watchlist/Watchlist";
import CurrencySwitch from "./CurrencySwitch";
import { Link } from "react-router-dom";

const Header = () => {
  const [sidebar, setSidebar] = useState("close");

  return (
    <header className="header">
      <div className="container header__wrapper">
        <Link to={'/'} className="logo">CRYPTOFOLIO</Link>
        <div className="buttons">
          <CurrencySwitch/>
          <button onClick={() => setSidebar("open")} className="watchlistbtn">
            WATCH LIST
          </button>
        </div>
      </div>
      <Watchlist sidebar={sidebar} setSidebar={setSidebar} />
    </header>
  );
};

export default Header;
