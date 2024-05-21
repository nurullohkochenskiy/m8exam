import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useCrypto } from "../../context/ContextProvider";

const ApexChart = ({ id }) => {
  const {getChart,prices } = useCrypto();
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: "area",
      stacked: false,
      height: 350,
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
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
      title: {
        text: "",
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
  });

  useEffect(() => {
    getChart(id)
    const formattedData = prices.map((price) => ({
      x: price[0],
      y: price[1],
    }));

    setSeries([{ name: "Price", data: formattedData }]);
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
