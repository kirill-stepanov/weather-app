<script setup lang="ts">
import WarningMessage from "@/components/WarningMessage.vue";

import { useWeatherReportsStore } from "@/stores/weatherReports";
import WeatherReportList from "@/components/WeatherReportList.vue";

const weatherReports = useWeatherReportsStore();
</script>

<template>
  <WeatherReportList
    v-if="weatherReports.favorites.length"
    :reports="weatherReports.favorites"
  />

  <WarningMessage v-else />
</template>
