import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart = ({ totalSaleData }) => {
  if (!totalSaleData || !Array.isArray(totalSaleData)) {
    return <div>No data available for the chart.</div>;
  }

  const formattedData = totalSaleData.map(dataPoint => ({
    x: new Date(dataPoint._id).getTime(),
    y: dataPoint.total,
  }));
  
  const seriesData = [
    {
      name: 'Total Sale',
      data: formattedData
    }
  ];

  const xaxisLabels = totalSaleData.map(dataPoint => new Date(dataPoint._id).getTime());

  const chartOptions = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Fundamental Analysis of Sales',
      align: 'left'
    },
    subtitle: {
      text: 'Price Movements',
      align: 'left'
    },
    xaxis: {
      type: 'datetime',
      categories: xaxisLabels,
    },
    yaxis: {
      opposite: true
    },
    legend: {
      horizontalAlign: 'left'
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={chartOptions} series={seriesData} type="area" height={350} />
    </div>
  );
};

export default Chart;