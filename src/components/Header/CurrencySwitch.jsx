import React, { useState } from "react";
import { useCrypto } from "../../context/ContextProvider";

const CurrencySwitch = () => {
  const { currency, setCurrency } = useCrypto();
  const [switcher, setSwitcher] = useState("hidden");

  const toggleSwitch = () => {
    if (switcher == "hidden") {
      setSwitcher(" ");
    } else {
      setSwitcher("hidden");
    }
  };
  const handleChangeCurrency = (id) => {
    setCurrency(id);
    
  };
  return (
    <div className="switch">
      <div onClick={() => toggleSwitch()} className="current">
        {currency.toUpperCase()}{" "}
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 10L12 15L17 10H7Z" fill="white" />
          </svg>
        </span>
      </div>
      <div className={`options ${switcher}`}>
        <div onClick={() => handleChangeCurrency("usd")}>USD</div>
        <div onClick={() => handleChangeCurrency("eur")}>EUR</div>
        <div onClick={() => handleChangeCurrency("rub")}>RUB</div>
      </div>
    </div>
  );
};

export default CurrencySwitch;
