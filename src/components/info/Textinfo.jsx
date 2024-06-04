import React, { useState, useEffect } from "react";
import { useCrypto } from "../../context/ContextProvider";

const Textinfo = ({ id }) => {
  const { loading, infoCrypto, currency, getInfo } = useCrypto();
  const [cooldown, setCooldown] = useState(10); // Initialize cooldown state

  const currencyHandler = (amount) => {
    if (currency === "usd") {
      return `$ ${amount.toFixed(2)}`;
    } else if (currency === "eur") {
      return `€ ${(amount * 0.92).toFixed(2)}`;
    } else if (currency === "rub") {
      return `₽ ${(amount * 90.3).toFixed(2)}`;
    }
  };

  const marketcapHandler = (amount) => {
    if (currency === "usd") {
      return `$ ${Number((amount / 1e6).toFixed(2)).toLocaleString("en-US")}`;
    } else if (currency === "eur") {
      return `€ ${Number(((amount * 0.92) / 1e6).toFixed(2)).toLocaleString(
        "en-US"
      )}`;
    } else if (currency === "rub") {
      return `₽ ${Number(((amount * 90.3) / 1e6).toFixed(2)).toLocaleString(
        "en-US"
      )}`;
    }
  };

  const loadAgain = () => {
    if (cooldown === 0) { // Prevent button click if cooldown is active
      getInfo(id);
      setCooldown(10); // Start cooldown timer
    }
  };

  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  if (loading) {
    return (
      <div className="left">
        <div className="title">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  if (!infoCrypto || !infoCrypto.image || !infoCrypto.market_data) {
    return (
      <div className="left">
        <div className="title">
          <h2>Could not load the data, try again</h2>
          {cooldown > 0 ? (
            <button disabled={cooldown > 0}>Try again in {cooldown} seconds</button>
          ) : (
            <button onClick={loadAgain}>Try Again</button>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="left">
      <div className="title">
        <span>
          <img width={200} height={200} src={infoCrypto.image.large} alt="" />
        </span>
        <h1>{infoCrypto.name}</h1>
      </div>
      <p>{infoCrypto.description.en.substring(0, 235) + "..."}</p>
      <div className="additionals">
        <div>
          Rank: <span>{infoCrypto.market_cap_rank}</span>
        </div>
        <div>
          Current Price:{" "}
          <span>{currencyHandler(infoCrypto.market_data.ath.usd)}</span>
        </div>
        <div>
          Market Cap:{" "}
          <span>
            {marketcapHandler(infoCrypto.market_data.market_cap.usd)}M
          </span>
        </div>
      </div>
    </div>
  );
};

export default Textinfo;
