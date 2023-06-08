<template>
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.1/font/bootstrap-icons.css">
    <link rel="icon" href="../assets/images/gas-icon.ico">

  <div class="container">
    <div class="row">
      <div class="col-12 main-topic gas-image">
        <div class="main-topic-text">Gas Tracker</div>
      </div>
    </div>

    <!-- Gas metrics -->
    <div class="row justify-content-center">
      <div v-for="metric in gasMetrics" :key="metric.label" class="col-lg-4 col-md-6 col-sm-12 gas-metric">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">{{ metric.label }}</h3>
            <div class="price-value">
              <span :class="getPriceClass(metric.label)">
                <span v-if="getPriceClass(metric.label) === 'low-price'">
                  <i class="bi bi-arrow-up"></i>
                </span>
                <span v-if="getPriceClass(metric.label) === 'average-price'">
                  <i class="bi bi-dash"></i>
                </span>
                <span v-if="getPriceClass(metric.label) === 'high-price'">
                  <i class="bi bi-arrow-down"></i>
                </span>
                <span class="metric-label">{{ metric.lowGasPrice }} gwei</span>
              </span>
            </div>
            <div class="all-metric-values">
              <div class="metric-value">
                <label>Base price:</label>
                <span>{{ metric.basePrice }}$</span>
              </div>
              <div class="metric-value">
                <label>Priority price:</label>
                <span>{{ metric.priorityPrice }}$</span>
              </div>
              <div class="metric-value">
                <label>Total Cost:</label>
                <span>{{ metric.totalCost }}$</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeframe switchers -->
    <div class="row mt-3">
      <div class="col-md-7 col-sm-12">
        <div class="timeframe-switchers">
          <button @click="changeTimeframe('7')" class="btn btn-secondary button-spacing" :class="{ active: currentTimeframe === '7' }">7 days</button>
          <button @click="changeTimeframe('30')" class="btn btn-secondary button-spacing" :class="{ active: currentTimeframe === '30' }">30 days</button>
          <button @click="changeTimeframe('90')" class="btn btn-secondary" :class="{ active: currentTimeframe === '90' }">90 days</button>
        </div>
      </div>
    </div>

    <!-- Gas price chart -->
    <div class="row justify-content-center mt-3">
      <div class="col-12">
        <div class="gas-chart">
          <h2 class="gas-price-topic">Gas Price Chart</h2>
          <div id="gasPriceChart" ref="chartElement"></div>
        </div>
      </div>
    </div>

    <!-- Network switchers -->
    <div class="row mt-3">
      <div class="col-md-7 col-sm-12">
        <div class="network-switchers">
          <button @click="changeNetwork('ethereum')" class="btn btn-primary" :class="{ active: currentNetwork === 'ethereum' }">Ethereum</button>
          <button @click="changeNetwork('binance')" class="btn btn-primary" :class="{ active: currentNetwork === 'binance' }">Binance Smart Chain</button>
          <button @click="changeNetwork('polygon')" class="btn btn-primary" :class="{ active: currentNetwork === 'polygon' }">Polygon</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import ChartService from '@/services/ChartService';

export default {
  name: 'GasTracker',
  data() {
    return {
      gasMetrics: [
        {
          label: 'Low Gas Price',
          lowGasPrice: 0,
          basePrice: 0,
          priorityPrice: 0,
          totalCost: 0,
        },
        {
          label: 'Average Gas Price',
          lowGasPrice: 0,
          basePrice: 0,
          priorityPrice: 0,
          totalCost: 0,
        },
        {
          label: 'High Gas Price',
          lowGasPrice: 0,
          basePrice: 0,
          priorityPrice: 0,
          totalCost: 0,
        },
      ],
      currentNetwork: 'ethereum',
      chartData: [],
      chartInstance: null,
      currentTimeframe: '7',
    };
  },
  mounted() {
    this.fetchGasMetrics();
    this.fetchGasPriceChartData();
  },
  methods: {
    fetchGasMetrics() {
      ApiService.getGasMetrics(this.currentNetwork)
        .then((response) => {
          this.gasMetrics[0].lowGasPrice = response.lowGasPrice;
          this.gasMetrics[0].basePrice = response.basePrice;
          this.gasMetrics[0].priorityPrice = response.priorityPrice;
          this.gasMetrics[0].totalCost = response.totalCost;

          this.gasMetrics[1].lowGasPrice = response.averageGasPrice;
          this.gasMetrics[1].basePrice = response.basePrice;
          this.gasMetrics[1].priorityPrice = response.priorityPrice;
          this.gasMetrics[1].totalCost = response.totalCost;

          this.gasMetrics[2].lowGasPrice = response.highGasPrice;
          this.gasMetrics[2].basePrice = response.basePrice;
          this.gasMetrics[2].priorityPrice = response.priorityPrice;
          this.gasMetrics[2].totalCost = response.totalCost;
        })
        .catch((error) => {
          console.error('Failed to fetch gas metrics:', error);
        });
    },
    fetchGasPriceChartData() {
      ApiService.getGasPriceChartData(this.currentNetwork, this.currentTimeframe)
        .then((response) => {
          this.chartData = response;
          this.renderGasPriceChart();
        })
        .catch((error) => {
          console.error('Failed to fetch gas price chart data:', error);
        });
    },
    renderGasPriceChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const chartElement = this.$refs.chartElement;
      if (chartElement && this.chartData.length > 0) {
        this.chartInstance = ChartService.createGasPriceChart(this.$refs.chartElement.id, this.chartData);
      }
    },
    changeNetwork(network) {
      if (this.currentNetwork !== network) {
        this.currentNetwork = network;
        this.fetchGasMetrics();
        this.fetchGasPriceChartData();
      }
    },
    changeTimeframe(timeframe) {
      this.currentTimeframe = timeframe;
      this.fetchGasPriceChartData();
    },
    getPriceClass(label) {
      if (label === 'Low Gas Price') {
        return 'low-price';
      } else if (label === 'Average Gas Price') {
        return 'average-price';
      } else if (label === 'High Gas Price') {
        return 'high-price';
      }
    },
  },
};
</script>

<style scoped>
.gas-image{
  background-image: url("../assets/images/petrol-station.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center top 35px;
  height: 40vh;
}
.main-topic, .gas-price-topic {
  font-size: 50px;
  font-weight: bold;
  position: relative;
  text-align: center;
  font-family: 'Caveat', cursive;
}
.main-topic-text {
  position: relative;
  margin-bottom: 20px;
  font-weight: 700;
}
.gas-metric {
  width: 300px;
  margin-right: 20px;
  margin-bottom: 30px;
  text-align-last: center;
}
.all-metric-values {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.metric-value {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
}
.metric-value label {
  margin-right: 3px;
}
.gas-chart {
  margin-bottom: 20px;
}
.network-switchers {
  margin: 20px 0;
}
.network-switchers button {
  margin-right: 10px;
}
.network-switchers button.active {
  font-weight: bold;
}
.metric-label {
  font-size: 20px;
}
.low-price {
  color: #32CD32;
}
.average-price {
  color: #0000FF;
}
.high-price {
  color: #FF0000;
}
.price-value {
  margin-bottom: 3px;
}
.button-spacing {
    margin-right: 15px;
  }
</style>
