import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useCrypto } from "../../context/ContextProvider";

const ApexChart = () => {
  const { prices, chartLoading, currency } = useCrypto();
  const [series, setSeries] = useState([]);
  const [key, setKey] = useState(0); //! Key is for force re-rendering for currency changing
  const [options, setOptions] = useState({
    chart: {
      type: "area",
      stacked: false,
      height: 350,
    },
    stroke: {
      curve: "straight",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Price (Past 1 days) in USD",
      align: "center",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    colors: ["#87CEEB"],
    grid: {
      borderColor: "#000",
      yaxis: {
        title: {
          text: "",
        },
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return currencyHandler(val);
        },
      },
      title: {
        text: "",
      },
    },
    xaxis: {
      labels: {
        rotate: -50,
        rotateAlways: true,
        datetimeUTC: true,
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm",
        },
      },
      offsetY: -13, //Change overflow
      type: "datetime",
      axisBorder: {
        show: true,
        color: "#000",
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return currencyHandler(val);
        },
      },
    },
    noData: {
      text: "Loading...",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "#fff",
        fontSize: "16px",
        fontFamily: "Helvetica",
      },
    },
  });
  //! re render chart when recieved price from server
  useEffect(() => {
    const formattedData = prices.map((price) => ({
      x: price[0],
      y: price[1],
    }));

    setSeries([{ name: "Price", data: formattedData }]);
  }, [prices]);
  //! fix nodata
  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      noData: {
        ...prevOptions.noData,
        text: chartLoading
          ? "Loading..."
          : "Failed to load resources, try again",
      },
    }));
  }, [chartLoading]);

  //! Update options and force re-render when currency changes
  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      yaxis: {
        ...prevOptions.yaxis,
        labels: {
          formatter: function (val) {
            return currencyHandler(val);
          },
        },
      },
      tooltip: {
        ...prevOptions.tooltip,
        y: {
          formatter: function (val) {
            return currencyHandler(val);
          },
        },
      },
    }));
    setKey((prevKey) => prevKey + 1); // Increment the key to force re-render
  }, [currency]);

  const currencyHandler = (amount) => {
    if (currency == "usd") {
      return `$ ${amount.toFixed(2)}`;
    } else if (currency == "eur") {
      return `€ ${(amount * 0.92).toFixed(2)}`;
    } else if (currency == "rub") {
      return `₽ ${(amount * 90.3).toFixed(2)}`;
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          key={key} // Use the key to force re-render
          options={options}
          series={series}
          type="area"
          height={650}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
