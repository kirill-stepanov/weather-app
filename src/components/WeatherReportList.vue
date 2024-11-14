<script setup lang="ts">
import type { WeatherReportState } from "@/stores/weatherReport";

import WeatherReport from "@/components/WeatherReport.vue";

defineProps<{
  reports: WeatherReportState[];
}>();
</script>

<template>
  <div :key="report.id" v-for="report in reports" v-if="reports.length">
    <WeatherReport :weatherReport="report" />
  </div>
</template>
