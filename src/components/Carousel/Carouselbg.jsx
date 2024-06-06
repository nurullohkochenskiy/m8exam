import React from "react";
import backgroundImage from '../../pictures/carousel/backpic.jpg'

const Carouselbg = ({ children }) => {
  const style = {
    backgroundImage: `url(${backgroundImage})`,
  };
  return (
    <div style={style} className="carousel__wrapper">
      <div className="container">
        <div className="maintext">
          <div className="intro">CRYPTOFOLIO WATCH LIST</div>
          <p>Get all the Info regarding your favorite Crypto Currency</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Carouselbg;
