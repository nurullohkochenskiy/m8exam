import React, { createContext, useState, useContext, useEffect } from "react";

const Cryptocontext = createContext();

export function ContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [cryptos, setCryptos] = useState([]);
  const [foundCryptos, setFoundCryptos] = useState([]);
  const [infoCrypto, setInfoCrypto] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const getCryptos = (page) => {
    setLoading(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=5&page=${page}&sparkline=false&price_change_percentage=24h`
    )
      .then((response) => response.json())
      .then((data) => setFoundCryptos(data));
    setLoading(false);
  };
  const getInfo = (id) => {
    setLoading(true);
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => response.json())
      .then((data) => setInfoCrypto(data));
    setLoading(false);
  };
  useEffect(() => {
    if (!cryptos.length > 0) {
      setLoading(true);
      fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
      )
        .then((response) => response.json())
        .then((data) => setCryptos(data));
      setLoading(false);
    }
    getCryptos(1);
  }, []);

  return (
    <Cryptocontext.Provider
      value={{
        loading,
        cryptos,
        foundCryptos,
        getCryptos,
        setWatchlist,
        watchlist,
        currency,
        setCurrency,
        getInfo,
        infoCrypto,
      }}
    >
      {children}
    </Cryptocontext.Provider>
  );
}

export function useCrypto() {
  return useContext(Cryptocontext);
}
