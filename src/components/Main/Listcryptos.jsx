import React, { useEffect, useState } from "react";
import { useCrypto } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import eyeActive from "../../pictures/main/eye_active.png";
import eyeNonActive from "../../pictures/main/eye_non_active.png";
const Listcryptos = ({ recordsForPerPage }) => {
  const { watchlist, setWatchlist, currency } = useCrypto();
  const navigate = useNavigate();
  const toggleWatch = (id) => {
    if (watchlist.includes(id)) {
      setWatchlist(watchlist.filter((item) => item !== id));
    } else {
      setWatchlist([...watchlist, id]);
    }
  };
  const currencyHandler = (amount) => {
    if (currency == "usd") {
      return `$ ${amount.toFixed(2)}`;
    } else if (currency == "eur") {
      return `€ ${(amount * 0.92).toFixed(2)}`;
    } else if (currency == "rub") {
      return `₽ ${(amount * 90.3).toFixed(2)}`;
    }
  };
  const marketcapHandler = (amount) => {
    if (currency == "usd") {
      return `$ ${Number(amount.toString().slice(0, -6)).toLocaleString(
        "en-US"
      )}`;
    } else if (currency == "eur") {
      return `€ ${Number(
        (amount * 0.92).toString().slice(0, -6)
      ).toLocaleString("en-US")}`;
    } else if (currency == "rub") {
      return `₽ ${Number(
        (amount * 90.3).toString().slice(0, -6)
      ).toLocaleString("en-US")}`;
    }
  };
  const handleNavigate = (id) => {
    navigate(`/info/${id}`);
  };

  return (
    <ul className="list">
      {recordsForPerPage.map((crypto, i) => {
        return (
          <li key={i} className="list__item">
            <div className="skelet">
              <div onClick={() => handleNavigate(crypto.id)} className="coin">
                <img src={crypto.image} width={50} height={50} alt="" />
                <div className="name">
                  <div className="short">{crypto.symbol.toUpperCase()}</div>
                  <div className="full">{crypto.name}</div>
                </div>
              </div>
              <div onClick={() => handleNavigate(crypto.id)} className="price">
                {currencyHandler(crypto.current_price)}
              </div>
              <div className="change">
                <div>
                  <span onClick={() => toggleWatch(crypto.id)}>
                    {watchlist.includes(crypto.id) ? (
                      <img width={27} height={28} src={eyeActive} alt="" />
                    ) : (
                      <img width={27} height={28} src={eyeNonActive} alt="" />
                    )}
                  </span>
                  {crypto.price_change_percentage_24h > 0 ? (
                    <span className="digits success">
                      {"+" +
                        crypto.price_change_percentage_24h.toFixed(2) +
                        "%"}
                    </span>
                  ) : (
                    <span className="digits danger">
                      {crypto.price_change_percentage_24h.toFixed(2) + "%"}
                    </span>
                  )}
                </div>
              </div>
              <div onClick={() => handleNavigate(crypto.id)} className="cap">
                {marketcapHandler(crypto.market_cap)}M
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Listcryptos;
