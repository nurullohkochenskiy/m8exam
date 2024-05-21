import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Carouselbg from "../../components/Carousel/Carouselbg";
import Prices from "../../components/Main/Prices";
import Header from "../../components/Header/Header";

const Main = () => {
  return (
    <>
    <Header/>
      <Carouselbg>
        <Carousel />
      </Carouselbg>
      <Prices/>
    </>
  );
};

export default Main;
