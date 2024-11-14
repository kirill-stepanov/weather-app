<script setup lang="ts">
import {
  useWeatherReportStore,
  type WeatherReportState,
} from "@/stores/weatherReport";

import WeatherReportMain from "@/components/WeatherReportMain.vue";
import WeatherReportChart from "@/components/WeatherReportChart.vue";
import WeatherReportForecast from "@/components/WeatherReportForecast.vue";
import WeatherReportHeader from "@/components/WeatherReportHeader.vue";

const props = defineProps<{
  weatherReport: WeatherReportState;
}>();

const weatherReportStore = useWeatherReportStore();
</script>

<template>
  <div class="container">
    <WeatherReportHeader :weatherReport="weatherReport" />

    <div
      v-if="
        props.weatherReport.current ||
        (weatherReportStore.loading &&
          props.weatherReport.id === weatherReportStore.id)
      "
    >
      <div class="wrapper__top__section">
        <WeatherReportMain :weatherReport="weatherReport" />

        <WeatherReportChart :weatherReport="weatherReport" />
      </div>

      <WeatherReportForecast :weatherReport="weatherReport" />
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #c4e2ff;
  padding: 20px;
  border-radius: 16px;
}

.wrapper__top__section {
  display: flex;
  gap: 20px;
  margin: 20px 0;
  min-height: 300px;
}

@media (max-width: 1130px) {
  .wrapper__top__section {
    flex-direction: column;
  }
}
</style>
