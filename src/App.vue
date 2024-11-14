<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { RouterView } from "vue-router";
import { v4 as uuidv4 } from "uuid";

import { localStorageKeys } from "@/constants";

import { useGeolocation } from "@/hooks/useGeolocation";
import { type RequestParams } from "@/hooks/useApiFetch";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { useWeatherReportsStore } from "@/stores/weatherReports";
import { useWeatherReportStore, type Coordinate } from "@/stores/weatherReport";

import Header from "@/components/Header.vue";

const { locale } = useI18n();
const geolocation = useGeolocation();
const { getItem } = useLocalStorage();
const weatherReport = useWeatherReportStore();
const weatherReports = useWeatherReportsStore();

const getFavoriteReports = () => {
  const coordinates: Coordinate[] = getItem(localStorageKeys.COORDINATES);

  coordinates.forEach((coordinate) => {
    const params: RequestParams = {
      lat: coordinate.lat,
      lon: coordinate.lon,
      units: "metric",
      lang: locale.value,
    };
    weatherReport.getWeatherReport(uuidv4(), params, "favorite");
  });
};

onMounted(() => {
  weatherReports.createDefaultReports();
  geolocation.getUserLocation();
  getFavoriteReports();
});
</script>

<template>
  <Header />

  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
