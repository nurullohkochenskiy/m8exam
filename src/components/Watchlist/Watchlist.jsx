import React from "react";
import { useCrypto } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
const Watchlist = ({ sidebar, setSidebar }) => {
    const navigate = useNavigate();
  const { cryptos, watchlist, setWatchlist, currency } =
    useCrypto();
  const list = cryptos.filter((crypto) =>
    watchlist.some((id) => crypto.id == id)
  );
  const toggleRemove = (id) => {
    setWatchlist(watchlist.filter((item) => item !== id));
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
  const handleNavigate = (id)=>{
    navigate(`/info/${id}`)
  }
  return (
    <div
      className={`watchlist__wrapper ${sidebar == "close" && "close__sidebar"}`}
    >
      <div className="head">
        <div className="title">WATCHLIST</div>
        <span onClick={() => setSidebar("close")} className="icon">
          <img src="/close.png" width={32} height={32} alt="" />
        </span>
      </div>
      <div className="grid__container">
        {list.map((item) => {
          return (
            <div  class="grid__item">
              <span onClick={()=>handleNavigate(item.id)} className="icon">
                <img width={118} height={118} src={item.image} alt="" />
              </span>
              <div onClick={()=>handleNavigate(item.id)} className="price">{currencyHandler(item.current_price)}</div>
              <button
                onClick={() => toggleRemove(item.id)}
                className="remove__btn"
              >
                {" "}
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Watchlist;
