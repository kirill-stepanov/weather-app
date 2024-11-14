<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { getWeatherIconComponent, roundNumber } from "@/helpers";

import {
  useWeatherReportStore,
  type WeatherReportState,
} from "@/stores/weatherReport";

import SkeletonLoading from "@/components/Global/SkeletonLoading.vue";

import IconWind from "@/components/icons/IconWind.vue";
import IconHumidity from "@/components/icons/IconHumidity.vue";

const props = defineProps<{
  weatherReport: WeatherReportState;
}>();

const { t } = useI18n();
const weatherReport = useWeatherReportStore();
</script>

<template>
  <SkeletonLoading
    v-if="props.weatherReport.id === weatherReport.id && weatherReport.loading"
  />

  <div v-else class="current__report">
    <span class="title">{{ props.weatherReport.timezone }}</span>

    <div class="current__report__main">
      <component
        class="icon"
        :is="
          getWeatherIconComponent(props.weatherReport.current?.weather[0]?.icon)
        "
      />

      <div class="current__report__main__wrapper">
        <span class="temp">
          {{
            t("weatherReport.now", {
              num: roundNumber(props.weatherReport.current?.temp),
            })
          }}
        </span>

        <span class="weather">
          {{ props.weatherReport.current?.weather[0]?.description }}
        </span>
      </div>
    </div>

    <div>
      {{
        t("weatherReport.feelsLike", {
          temperature: props.weatherReport.current?.feels_like,
        })
      }}
    </div>

    <div class="subtitle">
      <span>
        <IconWind class="icon" />

        {{ props.weatherReport.current?.wind_speed }}
        {{ t("weatherReport.metersInSec") }}
      </span>

      <span>
        <IconHumidity class="icon" />
        {{
          t("weatherReport.humidity", {
            percent: props.weatherReport.current?.humidity,
          })
        }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.current__report {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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
}

.title {
  font-size: 36px;
  font-weight: bold;
  color: #222;
}

.current__report__main {
  display: flex;
  align-items: center;
  gap: 20px;
}

.current__report__main__wrapper {
  display: flex;
  flex-direction: column;
}

.current__report__main .icon {
  width: 120px;
  height: 120px;
}

.temp {
  font-size: 60px;
}

.weather {
  font-size: 36px;
}

.subtitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #2e2e38;
  font-weight: 600;
  gap: 5px;
}

.subtitle span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.card__icon {
  width: 24px;
  height: 24px;
}

@media (max-width: 700px) {
  .current__report__main {
    flex-direction: column;
    margin-top: 20px;
  }

  .current__report__main .icon {
    width: 60px;
    height: 60px;
  }

  .title,
  .weather {
    font-size: 24px;
  }

  .temp {
    font-size: 36px;
  }
}
</style>
