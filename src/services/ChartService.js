import ApexCharts from 'apexcharts';

class ChartService {
  createGasPriceChart(elementId, chartData) {
    const options = {
      chart: {
        type: 'line',
        height: 400,
      },
      series: [
        {
          name: 'Gas Price',
          data: chartData.map((dataPoint) => dataPoint.price),
        },
      ],
      xaxis: {
        type: 'datetime',
        categories: chartData.map((dataPoint) => dataPoint.time),
      },
    };

    const chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render();
    return chart;
  }
  
}

export default new ChartService();