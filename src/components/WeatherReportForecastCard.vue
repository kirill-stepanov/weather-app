<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { type DailyForecast, type WeatherTypes } from "@/stores/weatherReport";

import { formattedDate, getWeatherIconComponent, roundNumber } from "@/helpers";

import IconWind from "@/components/icons/IconWind.vue";
import IconHumidity from "@/components/icons/IconHumidity.vue";

const props = defineProps<{
  dailyReport: DailyForecast;
  weatherType: WeatherTypes;
}>();

const { t } = useI18n();

const isDay = computed(() => {
  return props.weatherType == "day";
});
</script>

<template>
  <div class="card">
    <div class="card__title">
      <span>{{
        formattedDate({ date: dailyReport.dt, showWeekday: true })
      }}</span>

      <span class="card__subtitle bold">
        {{
          t(`weatherReport.${weatherType}`, {
            num: roundNumber(
              isDay ? dailyReport.temp.day : dailyReport.temp.night
            ),
          })
        }}
      </span>
    </div>

    <div class="card__subtitle">
      <span>
        <IconWind class="card__icon" />

        {{ dailyReport.wind_speed }}{{ t("weatherReport.metersInSec") }}
      </span>

      <span
        ><IconHumidity class="card__icon" /> {{ dailyReport.humidity }}%</span
      >
    </div>

    <div class="card__subtitle">
      <span>
        <component
          class="icon"
          :is="getWeatherIconComponent(dailyReport.weather[0]?.icon)"
        />

        <span>{{ dailyReport.weather[0]?.description }}</span>
      </span>

      <span>
        {{ roundNumber(dailyReport.temp.max) }}°/{{
          roundNumber(dailyReport.temp.min)
        }}°
      </span>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: white;
  border-radius: 16px;
  flex: 1;
  background-color: #fff;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #222;
  fill: currentcolor;
  padding: 12px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card__subtitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #2e2e38;
  font-weight: 600;
  gap: 5px;
}

.card__subtitle span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.card__icon {
  width: 24px;
  height: 24px;
}

.bold {
  font-weight: bold;
}
</style>
