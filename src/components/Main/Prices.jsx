import React, { useEffect, useState } from "react";
import { useCrypto } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

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
                              src="https://s3-alpha-sig.figma.com/img/f831/a651/3bc0016347adedf4a37b1af68bcb397b?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gtOzWSyFvVAtv~vTNIKejTJ40aUPVFMHAxUGeIlISb6IeshGfUGz1ESq~7m6yy9Y1iExqBCX7FGMwlGJf32prsy-i9ixglx9cD9bIdIJDtX01jP8MjjtJNCos3s5uWRly6182hGCX6sbAqQnWzoyr89lLn3G6aCJbsvvU8ZAk~5yRX9tpL~vXu0cM2GiQRzstNPe6EXdvJfAPa0iWiffPnQHE8m3RKVjIy7DoZq5VwF83K7SWupd1zZRg8WmU5p-RUVanp3NzNZwAKUCjws4oPM-XHFsL4QrOInuES2-POY4QYDW3Oj~xBhlYoX36i7TwJhfeQw26j023ehkCKmYWQ__"
                              alt=""
                            />
                          ) : (
                            <img
                              width={27}
                              height={28}
                              src="https://s3-alpha-sig.figma.com/img/30b6/e25e/625e6816726163de6abc34626dfe6f39?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lH7OSa69B1WW79sHgRUgH24BIXwbysDhpTZnWQ0~RaRaiIUyetFx-H1iB7MNHJA7hWVvnBUODgk9LIzYdsOxIdDEWjEEGluOnsTF9YUEXKpzrCuj5GJnsIK1i2zvD2h6B9RxGrnLWWPZIfsrmoceXrzPAZQcoUjWirYhXDeiVf~x93Tu-P18p~Ld6Istp4SvfRxZp10lCdvV2obGSJ1YuPcqmBFVmKD0jYQuSZgvuc5RIOl6WdXLSIMSVCOXBOTA9qv88UWPIusQ8e5B53WhNC9xeKDNE39Ect5hIB~ryikjiEYJkl4I5HjHr8xMgCr5r9eEHZluRBATJvcF9mABAQ__"
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
