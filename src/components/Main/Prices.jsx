import React, { useEffect, useState } from "react";
import { useCrypto } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import eyeActive from '../../pictures/main/eye_active.png'
import eyeNonActive from '../../pictures/main/eye_non_active.png'

const Prices = () => {
  const { cryptos, getCryptos, watchlist, setWatchlist, currency } =
    useCrypto();
  console.log(cryptos);
  //! Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = cryptos.slice(firstIndex, lastIndex);
  // const nPage = Math.ceil(cryptos.length / recordsPerPage);
  // const numbers = [...Array(nPage + 1).keys()].slice(1);
  //! Pagination end
  const navigate = useNavigate();
  const pagePlus = () => {
    if (currentPage !== 2) {
      setCurrentPage(currentPage + 1);
    }
  };
  const pageMinus = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
  useEffect(() => {
    getCryptos();
  }, []);
  return (
    <main className="prices__wrapper">
      <div className="container ">
        <div className="title">Cryptocurrency Prices by Market Cap</div>
        <div className="search">
          <input placeholder="Search For a Crypto Currency.." type="text" />
        </div>

        <div className="list__wrapper">
          <div className="sorting">
            <div className="coin">Coin</div>
            <div className="price">Price</div>
            <div className="change">24h Change</div>
            <div className="cap">Market Cap</div>
          </div>
          <ul className="list">
            {records.map((crypto, i) => {
              return (
                <li key={i} className="list__item">
                  <div className="skelet">
                    <div
                      onClick={() => handleNavigate(crypto.id)}
                      className="coin"
                    >
                      <img src={crypto.image} width={50} height={50} alt="" />
                      <div className="name">
                        <div className="short">
                          {crypto.symbol.toUpperCase()}
                        </div>
                        <div className="full">{crypto.name}</div>
                      </div>
                    </div>
                    <div
                      onClick={() => handleNavigate(crypto.id)}
                      className="price"
                    >
                      {currencyHandler(crypto.current_price)}
                    </div>
                    <div className="change">
                      <div>
                        <span onClick={() => toggleWatch(crypto.id)}>
                          {watchlist.includes(crypto.id) ? (
                            <img
                              width={27}
                              height={28}
                              src={eyeActive}
                              alt=""
                            />
                          ) : (
                            <img
                              width={27}
                              height={28}
                              src={eyeNonActive}
                              alt=""
                            />
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
                            {crypto.price_change_percentage_24h.toFixed(2) +
                              "%"}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      onClick={() => handleNavigate(crypto.id)}
                      className="cap"
                    >
                      {marketcapHandler(crypto.market_cap)}M
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="pagination">
            <div onClick={() => pageMinus()}>{"<"}</div>
            <div
              className={currentPage == 1 ? "active": ''}
              onClick={() => setCurrentPage(1)}
            >
              1
            </div>
            <div
              className={currentPage == 2 ? "active": ''}
              onClick={() => setCurrentPage(2)}
            >
              2
            </div>
            <div onClick={() => pagePlus()}>{">"}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Prices;
