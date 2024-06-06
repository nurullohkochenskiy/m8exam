import React, { useEffect, useState } from "react";
import { useCrypto } from "../../context/ContextProvider";
import Listcryptos from "./Listcryptos";

const Prices = () => {
  const { cryptos, getCryptos } =
    useCrypto();
  const [itemsToDisplay, setItemsToDisplay] = useState(cryptos);
  const [searchInp, setSearchInp] = useState("");
  //! Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const recordsForPerPage = itemsToDisplay.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(itemsToDisplay.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  //! Pagination end
 
  const pagePlus = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const pageMinus = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchInp(e.target.value);
  };
  useEffect(() => {
    getCryptos();
  }, []);
  useEffect(() => {
    if (searchInp.length !== 0) {
      const filteredCryptos = cryptos.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchInp.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchInp.toLowerCase())
      );
      setItemsToDisplay(filteredCryptos);
    } else {
      setItemsToDisplay(cryptos);
    }
  }, [searchInp,cryptos]);
  return (
    <main className="prices__wrapper">
      <div className="container ">
        <div className="title">Cryptocurrency Prices by Market Cap</div>
        <div className="search">
          <input
            value={searchInp}
            onChange={handleSearchChange}
            placeholder="Search For a Crypto Currency.."
            type="text"
          />
        </div>

        <div className="list__wrapper">
          <div className="sorting">
            <div className="coin">Coin</div>
            <div className="price">Price</div>
            <div className="change">24h Change</div>
            <div className="cap">Market Cap</div>
          </div>
          //! List
          <Listcryptos
            itemsToDisplay={itemsToDisplay}
            searchInp={searchInp}
            recordsForPerPage={recordsForPerPage}
          />
          <div className="pagination">
            <div onClick={() => pageMinus()}>{"<"}</div>

            {numbers.map((order, i) => {
              return (
                <div
                  key={i}
                  className={currentPage == order ? "active" : ""}
                  onClick={() => setCurrentPage(order)}
                >
                  {order}
                </div>
              );
            })}
            <div onClick={() => pagePlus()}>{">"}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Prices;
