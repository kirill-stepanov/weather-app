<script setup lang="ts">
import WeatherReport from "@/components/WeatherReport.vue";

import { useWeatherReportsStore } from "@/stores/weatherReports";

const weatherReports = useWeatherReportsStore();
</script>

<template>
  <div
    :key="weatherReport.id"
    v-for="weatherReport in weatherReports.favorites"
  >
    <WeatherReport :weatherReport="weatherReport" />
  </div>
</template>
