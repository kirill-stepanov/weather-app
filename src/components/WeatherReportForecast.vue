<script setup lang="ts">
import {
  useWeatherReportStore,
  type WeatherReportState,
} from "@/stores/weatherReport";

import SkeletonLoading from "@/components/Global/SkeletonLoading.vue";
import WeatherReportForecastCard from "@/components/WeatherReportForecastCard.vue";

const props = defineProps<{
  weatherReport: WeatherReportState;
}>();

const weatherReport = useWeatherReportStore();
</script>

<template>
  <div class="forecast">
    <SkeletonLoading
      v-if="
        props.weatherReport.id === weatherReport.id && weatherReport.loading
      "
    />

    <WeatherReportForecastCard
      v-else
      v-for="dailyReport in props.weatherReport.daily"
      :key="dailyReport.dt"
      :dailyReport="dailyReport"
      :weatherType="props.weatherReport.type"
    />
  </div>
</template>

<style scoped>
.forecast {
  min-height: 114px;
  display: flex;
  gap: 20px;
}

@media (max-width: 1130px) {
  .forecast {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 700px) {
  .forecast {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
