class ApiService {
    getGasMetrics(network) {
      // Simulate API call and return a Promise with mocked data
      return new Promise((resolve, reject) => {
        // Simulate API delay
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
  
    getGasPriceChartData(network) {
      // Simulate API call and return a Promise with mocked data
      return new Promise((resolve, reject) => {
        // Simulate API delay
        setTimeout(() => {
          if (network === 'ethereum') {
            resolve([
              { time: '2022-01-01', price: 10 },
              { time: '2022-01-02', price: 15 },
              { time: '2022-01-03', price: 20 },
              { time: '2022-01-04', price: 30 },
              { time: '2022-01-05', price: 40 },
              { time: '2022-01-06', price: 50 },
            ]);
          } else if (network === 'binance') {
            resolve([
              { time: '2022-01-01', price: 60 },
              { time: '2022-01-02', price: 50 },
              { time: '2022-01-03', price: 40 },
              { time: '2022-01-04', price: 30 },
              { time: '2022-01-05', price: 20 },
              { time: '2022-01-06', price: 10 },
            ]);
          } else if (network === 'polygon') {
            resolve([
              { time: '2022-01-01', price: 12 },
              { time: '2022-01-02', price: 12 },
              { time: '2022-01-03', price: 13 },
              { time: '2022-01-04', price: 13 },
              { time: '2022-01-05', price: 14 },
              { time: '2022-01-06', price: 14 },
            ]);
          } else {
            reject(new Error('Invalid network'));
          }
        }, 500);
      });
    }
  }
  
  export default new ApiService();