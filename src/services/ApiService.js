class ApiService {
    getGasMetrics(network) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (network === 'ethereum') {
            resolve({
              lowGasPrice: 10,
              averageGasPrice: 20,
              highGasPrice: 30,
              basePrice: 15,
              priorityPrice: 25,
              totalCost: 100,
            });
          } else if (network === 'binance') {
            resolve({
              lowGasPrice: 5,
              averageGasPrice: 15,
              highGasPrice: 25,
              basePrice: 10,
              priorityPrice: 20,
              totalCost: 50,
            });
          } else if (network === 'polygon') {
            resolve({
              lowGasPrice: 8,
              averageGasPrice: 18,
              highGasPrice: 28,
              basePrice: 12,
              priorityPrice: 22,
              totalCost: 80,
            });
          } else {
            reject(new Error('Invalid network'));
          }
        }, 500);
      });
    }
  
    getGasPriceChartData(network, timeframe) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            let chartData = [];
      
            switch (network) {
              case 'ethereum':
                switch (timeframe) {
                  case '7':
                    chartData = [
                        { time: '2023-06-01', price: 12 },
                        { time: '2023-06-02', price: 13 },
                        { time: '2023-06-03', price: 18 },
                        { time: '2023-06-04', price: 25 },
                        { time: '2023-06-05', price: 28 },
                        { time: '2023-06-06', price: 35 },
                        { time: '2023-06-07', price: 40 },
                    ];
                    break;
                  case '30':
                    chartData = [
                        { time: '2023-06-01', price: 12 },
                        { time: '2023-06-03', price: 18 },
                        { time: '2023-06-05', price: 28 },
                        { time: '2023-06-07', price: 38 },
                        { time: '2023-06-09', price: 48 },
                        { time: '2023-06-11', price: 55 },
                        { time: '2023-06-13', price: 60 },
                        { time: '2023-06-15', price: 70 },
                        { time: '2023-06-17', price: 80 },
                        { time: '2023-06-19', price: 90 },
                        { time: '2023-06-21', price: 100 },
                        { time: '2023-06-23', price: 110 },
                        { time: '2023-06-25', price: 120 },
                        { time: '2023-06-30', price: 130 },
                    ];
                    break;
                  case '90':
                    chartData = [
                        { time: '2023-06-01', price: 12 },
                        { time: '2023-06-03', price: 18 },
                        { time: '2023-06-05', price: 28 },
                        { time: '2023-06-07', price: 38 },
                        { time: '2023-07-05', price: 45 },
                        { time: '2023-07-11', price: 100 },
                        { time: '2023-07-13', price: 120 },
                        { time: '2023-07-15', price: 150 },
                        { time: '2023-07-17', price: 180 },
                        { time: '2023-08-19', price: 210 },
                        { time: '2023-08-21', price: 240 },
                        { time: '2023-08-23', price: 270 },
                        { time: '2023-08-25', price: 300 },
                        { time: '2023-08-30', price: 330 },
                    ];
                    break;
                  default:
                    reject(new Error('Invalid timeframe'));
                    return;
                }
                break;
      
              case 'binance':
                switch (timeframe) {
                  case '7':
                    chartData = [
                        { time: '2023-06-01', price: 40 },
                        { time: '2023-06-02', price: 35 },
                        { time: '2023-06-03', price: 28 },
                        { time: '2023-06-04', price: 25 },
                        { time: '2023-06-05', price: 18 },
                        { time: '2023-06-06', price: 15 },
                        { time: '2023-06-07', price: 12 },
                    ];
                    break;
                  case '30':
                    chartData = [
                        { time: '2023-06-01', price: 130 },
                        { time: '2023-06-03', price: 120 },
                        { time: '2023-06-05', price: 110 },
                        { time: '2023-06-07', price: 100 },
                        { time: '2023-06-09', price: 90 },
                        { time: '2023-06-11', price: 80 },
                        { time: '2023-06-13', price: 70 },
                        { time: '2023-06-15', price: 60 },
                        { time: '2023-06-17', price: 50 },
                        { time: '2023-06-19', price: 40 },
                        { time: '2023-06-21', price: 30 },
                        { time: '2023-06-23', price: 20 },
                        { time: '2023-06-25', price: 15 },
                        { time: '2023-06-30', price: 10 },
                    ];
                    break;
                  case '90':
                    chartData = [
                        { time: '2023-06-01', price: 330 },
                        { time: '2023-06-03', price: 300 },
                        { time: '2023-06-05', price: 270 },
                        { time: '2023-06-07', price: 210 },
                        { time: '2023-07-09', price: 180 },
                        { time: '2023-07-11', price: 150 },
                        { time: '2023-07-13', price: 120 },
                        { time: '2023-07-15', price: 100 },
                        { time: '2023-07-17', price: 80 },
                        { time: '2023-08-19', price: 60 },
                        { time: '2023-08-21', price: 40 },
                        { time: '2023-08-23', price: 30 },
                        { time: '2023-08-25', price: 20 },
                        { time: '2023-08-30', price: 10 },
                    ];
                    break;
                  default:
                    reject(new Error('Invalid timeframe'));
                    return;
                }
                break;
      
              case 'polygon':
                switch (timeframe) {
                  case '7':
                    chartData = [
                        { time: '2023-06-01', price: 12 },
                        { time: '2023-06-02', price: 13 },
                        { time: '2023-06-03', price: 14 },
                        { time: '2023-06-04', price: 13 },
                        { time: '2023-06-05', price: 12 },
                        { time: '2023-06-06', price: 11 },
                        { time: '2023-06-07', price: 14 },
                    ];
                    break;
                  case '30':
                    chartData = [
                        { time: '2023-06-01', price: 20 },
                        { time: '2023-06-03', price: 30 },
                        { time: '2023-06-05', price: 40 },
                        { time: '2023-06-07', price: 50 },
                        { time: '2023-06-09', price: 60 },
                        { time: '2023-06-11', price: 50 },
                        { time: '2023-06-13', price: 40 },
                        { time: '2023-06-15', price: 30 },
                        { time: '2023-06-17', price: 20 },
                        { time: '2023-06-19', price: 30 },
                        { time: '2023-06-21', price: 40 },
                        { time: '2023-06-23', price: 50 },
                        { time: '2023-06-25', price: 20 },
                        { time: '2023-06-30', price: 40 },
                    ];
                    break;
                  case '90':
                    chartData = [
                        { time: '2023-06-01', price: 330 },
                        { time: '2023-06-03', price: 200 },
                        { time: '2023-06-05', price: 150 },
                        { time: '2023-06-07', price: 200 },
                        { time: '2023-07-09', price: 300 },
                        { time: '2023-07-11', price: 250 },
                        { time: '2023-07-13', price: 200 },
                        { time: '2023-07-15', price: 230 },
                        { time: '2023-07-17', price: 220 },
                        { time: '2023-08-19', price: 200 },
                        { time: '2023-08-21', price: 250 },
                        { time: '2023-08-23', price: 220 },
                        { time: '2023-08-25', price: 230 },
                        { time: '2023-08-30', price: 200 },
                    ];
                    break;
                  default:
                    reject(new Error('Error with timeframe'));
                    return;
                }
                break;
      
              default:
                reject(new Error('Error with network'));
                return;
            }
      
            resolve(chartData);
          }, 500); //Įsivaizduojame, kad API delay yra 500ms
        });
    }
}
  
  export default new ApiService();