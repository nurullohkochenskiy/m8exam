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
  }, [id, getInfo]);
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
                src="https://s3-alpha-sig.figma.com/img/4dc4/c742/07812d9bfc937edc89b4fbe07965167e?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UEIkZWuYzOMqxmLnre3oOlAFjf9IkMglrPV6fr4Sp0mQ2afFOD2U~p-wu2HvQd6tFtY6TQ-lS0QQRmFmoKpRmlVobP5BU~xv1qckesM~SewMmrQdVWAfaKpYuQsxNKQA6r2egb8M-mJ-6qfsalYFrVmjCGAaSPTly8bYnllRhzsxN5M2qSZqbVC1qINCTkvJzNuiaPVLQqvVsHzD7yqUiISi2Rxv1SYr4ba8yG5IggPoVlIVSdVy4eNxMFfO4A5H4h1Q3ha~slaSrC6Jaor9g4C~pyFKjZON-urOUuElLF6YgsekA~5hTYy7zrpRo~vWSRj5gxXjpe6vx2AA0HUMtw__"
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
        <div className="right">
          <ApexChart id={id} />
        </div>
      </div>
    </>
  );
};

export default Info;
