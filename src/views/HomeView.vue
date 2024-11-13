<script setup lang="ts">
import { useWeatherReportsStore } from "@/stores/weatherReports";

import WeatherReport from "@/components/WeatherReport.vue";

const weatherReports = useWeatherReportsStore();
</script>

<template>
  <div
    :key="weatherReport.id"
    v-for="weatherReport in weatherReports.currentReports"
  >
    <WeatherReport :weatherReport="weatherReport" />
  </div>
</template>
