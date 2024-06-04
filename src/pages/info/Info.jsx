import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useCrypto } from "../../context/ContextProvider";
import ApexChart from "../../components/info/chart";
import PeriodSwitch from "../../components/info/PeriodSwitch";
import Textinfo from "../../components/info/Textinfo";

const Info = () => {
  const {  getInfo, infoCrypto, getChart } = useCrypto();
  const { id } = useParams();

  useEffect(() => {
    if (!infoCrypto.length > 0) {
      getInfo(id);
    }
    setTimeout(() => {
      getChart(id, 1);
    }, 1000);
  }, []);

  return (
    <>
      <Header />
      <div className="info__container">
        <Textinfo id = {id} />
        <div className="right">
          <ApexChart />
          <PeriodSwitch id={id} />
        </div>
      </div>
    </>
  );
};

export default Info;
