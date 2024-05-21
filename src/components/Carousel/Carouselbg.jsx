import React from "react";

const Carouselbg = ({ children }) => {
  return (
    <div className="carousel__wrapper">
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
