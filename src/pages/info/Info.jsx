import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useCrypto } from "../../context/ContextProvider";
import ApexChart from "../../components/info/chart";

const Info = () => {
  const { loading, getInfo, infoCrypto, currency } = useCrypto();
  const { id } = useParams();

  useEffect(() => {
    getInfo(id);
  }, []);
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
  console.log(infoCrypto);
  if (loading) {
    return (
      <>
        <Header />
        <div className="noinfo">No information available</div>
      </>
    );
  }

  if (!infoCrypto || !infoCrypto.description) {
    return (
      <>
        <Header />
        <div className="noinfo">No information available</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="info__container">
        <div className="left">
          <div className="title">
            <span>
              <img
                width={200}
                height={200}
                src={infoCrypto.image.large}
                alt=""
              />
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
        <div className="right"><ApexChart id={id} /></div>
      </div>
    </>
  );
};

export default Info;
