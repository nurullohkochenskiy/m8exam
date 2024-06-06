import React from "react";
import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound__wrapper ">
      <div className="container">
        <h1>Coin not found :(</h1>
        <button onClick={()=>navigate("/")}>Return to main page</button>
      </div>
    </div>
  );
};

export default Notfound;
