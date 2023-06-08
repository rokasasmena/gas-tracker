<template>
  <div>
    <div class="main-topic gas-image">
      <div class="main-topic-text">Gas Tracker</div>
    </div>
    <!-- Display gas metrics -->
    <div class="gas-metrics">
      <div v-for="metric in gasMetrics" :key="metric.label" class="gas-metric">
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
            <div class="metric-values">
              <div class="metric-value">
                <label>Base price:</label>
                <span>{{ metric.basePrice }}</span>
              </div>
              <div class="metric-value">
                <label>Priority price:</label>
                <span>{{ metric.priorityPrice }}</span>
              </div>
              <div class="metric-value">
                <label>Total Cost in USD:</label>
                <span>{{ metric.totalCost }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gas price chart -->
    <div class="gas-chart">
      <h2 class="gas-price-topic">Gas Price Chart</h2>
      <div id="gasPriceChart" ref="chartElement"></div>
    </div>

    <!-- Network switchers -->
    <div class="network-switchers">
      <button @click="changeNetwork('ethereum')" :class="{ active: currentNetwork === 'ethereum' }">Ethereum</button>
      <button @click="changeNetwork('binance')" :class="{ active: currentNetwork === 'binance' }">Binance Smart Chain</button>
      <button @click="changeNetwork('polygon')" :class="{ active: currentNetwork === 'polygon' }">Polygon</button>
    </div>
  </div>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.1/font/bootstrap-icons.css">
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
      ApiService.getGasPriceChartData(this.currentNetwork)
        .then((response) => {
          this.chartData = response;
          this.renderGasPriceChart();
        })
        .catch((error) => {
          console.error('Failed to fetch gas price chart data:', error);
        });
    },
    renderGasPriceChart() {
      console.log('Rendering gas price chart...');
      console.log('Chart element:', this.$refs.chartElement);
      console.log('Chart data:', this.chartData);

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const chartElement = this.$refs.chartElement;
      if (chartElement && this.chartData.length > 0) {
        console.log('Creating chart instance...');
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
  background-image: url("../assets/images/petrol_station.jpg");
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
.main-topic::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1; /* Push the image behind the text */
  background-image: url("../assets/images/petrol_station.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
}
.main-topic-text {
  position: relative;
  margin-bottom: 20px;
  font-weight: 700;
}

.gas-metrics {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.gas-metric {
  width: 300px;
  margin-right: 20px;
  margin-bottom: 30px;
  text-align-last: center;
}

.metric-values {
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

.gas-chart {
  margin-bottom: 20px;
}

.network-switchers {
  margin-top: 20px;
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
  color: green;
}

.average-price {
  color: blue;
}

.high-price {
  color: red;
}
</style>
