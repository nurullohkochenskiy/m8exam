import React, { createContext, useState, useContext } from "react";

const Cryptocontext = createContext();
export function ContextProvider({ children }) {
  const [chartLoading, setChartLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cryptos, setCryptos] = useState([]);
  const [infoCrypto, setInfoCrypto] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState("");
  const getCryptos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
        { method: "GET", headers: { accept: "application/json" } }
      );

      const data = await response.json();
      setCryptos(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const getInfo = async (id) => {
    setError("");
    setLoading(true);
    setInfoCrypto({});
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`,
        { method: "GET", headers: { accept: "application/json" } }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setError("notfound");
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      setInfoCrypto(data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching info:", err);
      setLoading(false);
    }
  };

  const getChart = async (id, day) => {
    setChartLoading(true);
    setPrices([]);
    setError("");
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${day}`,
        { method: "GET", headers: { accept: "application/json" } }
      );
  
      if (!response.ok) {
        if (response.status === 404) {
          setError("notfound");
        }
        setChartLoading(false);
        return;
      }
  
      const data = await response.json();
      setPrices(data.prices);
      setChartLoading(false);
    } catch (err) {
      console.log("Error fetching data:", err);
      setChartLoading(false);
    }
  };
  

  return (
    <Cryptocontext.Provider
      value={{
        loading,
        cryptos,
        getCryptos,
        setWatchlist,
        watchlist,
        currency,
        setCurrency,
        getInfo,
        infoCrypto,
        getChart,
        prices,
        chartLoading,
        error,
      }}
    >
      {children}
    </Cryptocontext.Provider>
  );
}

export function useCrypto() {
  return useContext(Cryptocontext);
}
