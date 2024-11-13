<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, ref } from "vue";
import { Chart, registerables } from "chart.js";

import { formattedDate, roundNumber } from "@/helpers";

import {
  useWeatherReportStore,
  type WeatherReportState,
} from "@/stores/weatherReport";

import SkeletonLoading from "@/components/SkeletonLoading.vue";

const props = defineProps<{
  weatherReport: WeatherReportState;
}>();

Chart.register(...registerables);

const weatherReport = useWeatherReportStore();

const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const renderChart = () => {
  if (chartRef.value) {
    const data =
      props.weatherReport.hourly?.map((item) => roundNumber(item.temp)) ?? [];

    const labels =
      props.weatherReport.hourly?.map((item) =>
        formattedDate({
          date: item.dt,
          showHour: true,
        })
      ) ?? [];

    chartInstance?.destroy;
    chartInstance = new Chart(chartRef.value, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            fill: true,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
};

onMounted(() => {
  renderChart();
});

onUpdated(() => {
  chartInstance?.destroy();
  renderChart();
});

onUnmounted(() => {
  chartInstance?.destroy();
});
</script>

<template>
  <SkeletonLoading
    v-if="props.weatherReport.id === weatherReport.id && weatherReport.loading"
  />

  <div v-else class="chart__wrapper">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
.chart__wrapper {
  flex: 1;
  background-color: white;
  border-radius: 16px;
  background-color: #fff;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #222;
  fill: currentcolor;
  padding: 12px;
  max-width: 100%;
}
</style>
