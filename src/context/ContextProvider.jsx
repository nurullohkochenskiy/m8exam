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
    setLoading(true);
    setInfoCrypto({});
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`,
        { method: "GET", headers: { accept: "application/json" } }
      );
      const data = await response.json();
      setInfoCrypto(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const getChart = async (id, day) => {
    setChartLoading(true);
    setPrices([]);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${day}`,
        { method: "GET", headers: { accept: "application/json" } }
      );
      const data = await response.json();
      setPrices(data.prices);
      setChartLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setChartLoading(false);
    } finally {
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
      }}
    >
      {children}
    </Cryptocontext.Provider>
  );
}

export function useCrypto() {
  return useContext(Cryptocontext);
}
