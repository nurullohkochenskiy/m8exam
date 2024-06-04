import React, { useState, useEffect } from "react";
import { useCrypto } from "../../context/ContextProvider";

const PeriodSwitch = ({ id }) => {
  const { getChart } = useCrypto();
  const [period, setPeriod] = useState(1);
  const [cooldown, setCooldown] = useState(10);

  const handlePeriodChange = (day) => {
    if (cooldown > 0) return; // Prevent button clicks during cooldown
    setPeriod(day);
    getChart(id, day);
    setCooldown(10); // Start cooldown timer
  };

  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  return (
    <>
      {cooldown > 0 && (
        <div className="cooldown__msg">
          <h1>Changing periods is on cooldown: {cooldown} seconds!</h1>
        </div>
      )}
      <div className="period__switch">
        <button
          onClick={() => handlePeriodChange(1)}
          className={period === 1 ? "active" : ""}
          disabled={cooldown > 0}
        >
          24 Hours
        </button>
        <button
          onClick={() => handlePeriodChange(30)}
          className={period === 30 ? "active" : ""}
          disabled={cooldown > 0}
        >
          30 Days
        </button>
        <button
          onClick={() => handlePeriodChange(90)}
          className={period === 90 ? "active" : ""}
          disabled={cooldown > 0}
        >
          3 Months
        </button>
        <button
          onClick={() => handlePeriodChange(365)}
          className={period === 365 ? "active" : ""}
          disabled={cooldown > 0}
        >
          1 Year
        </button>
      </div>
    </>
  );
};

export default PeriodSwitch;
