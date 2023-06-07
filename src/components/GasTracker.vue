<template>
  <div>
    <h1>Gas Tracker</h1>
    <!-- Display gas metrics -->
    <div class="gas-metrics">
      <div class="gas-metric">
        <label>Low Gas Price:</label>
        <span>{{ lowGasPrice }}</span>
      </div>
      <div class="gas-metric">
        <label>Average Gas Price:</label>
        <span>{{ averageGasPrice }}</span>
      </div>
      <div class="gas-metric">
        <label>High Gas Price:</label>
        <span>{{ highGasPrice }}</span>
      </div>
      <div class="gas-metric">
        <label>Base Price:</label>
        <span>{{ basePrice }}</span>
      </div>
      <div class="gas-metric">
        <label>Priority Price:</label>
        <span>{{ priorityPrice }}</span>
      </div>
      <div class="gas-metric">
        <label>Total Cost in USD:</label>
        <span>{{ totalCost }}</span>
      </div>
    </div>

    <!-- Gas price chart -->
    <div class="gas-chart">
      <h2>Gas Price Chart</h2>
      <div id="gasPriceChart" ref="chartElement"></div>
    </div>

    <!-- Network switchers -->
    <div class="network-switchers">
      <button @click="changeNetwork('ethereum')" :class="{ active: currentNetwork === 'ethereum' }">Ethereum</button>
      <button @click="changeNetwork('binance')" :class="{ active: currentNetwork === 'binance' }">Binance Smart Chain</button>
      <button @click="changeNetwork('polygon')" :class="{ active: currentNetwork === 'polygon' }">Polygon</button>
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
      lowGasPrice: 0,
      averageGasPrice: 0,
      highGasPrice: 0,
      basePrice: 0,
      priorityPrice: 0,
      totalCost: 0,
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
          this.lowGasPrice = response.lowGasPrice;
          this.averageGasPrice = response.averageGasPrice;
          this.highGasPrice = response.highGasPrice;
          this.basePrice = response.basePrice;
          this.priorityPrice = response.priorityPrice;
          this.totalCost = response.totalCost;
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
  },
};
</script>

<style scoped>
.gas-metrics {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.gas-metric {
  width: 200px;
  margin-right: 20px;
  margin-bottom: 10px;
}

.gas-metric label {
  font-weight: bold;
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
</style>