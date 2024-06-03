import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useCrypto } from "../../context/ContextProvider";

const ApexChart = () => {
  const { prices, chartLoading } = useCrypto();
  const [series, setSeries] = useState([]);
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
          return val.toFixed(2);
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
          return val.toFixed(2);
        },
      },
    },
    noData: {
      text: chartLoading ? "Loading..." : "Loading... If graph does not appear, try again",
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

  useEffect(() => {
    const formattedData = prices.map((price) => ({
      x: price[0],
      y: price[1],
    }));

    setSeries([{ name: "Price", data: formattedData }]);
  }, [prices]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
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
