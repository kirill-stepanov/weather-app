<script setup lang="ts">
import { useWeatherReportsStore } from "@/stores/weatherReports";

import WeatherReportList from "@/components/WeatherReportList.vue";

const weatherReports = useWeatherReportsStore();
</script>

<template>
  <WeatherReportList :reports="weatherReports.currentReports" />
</template>
