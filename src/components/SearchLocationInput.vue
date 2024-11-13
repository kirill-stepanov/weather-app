<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { type RequestParams } from "@/hooks/useApiFetch";

import { useLocationsStore, type LocationsData } from "@/stores/locations";
import {
  useWeatherReportStore,
  type WeatherReportState,
} from "@/stores/weatherReport";

import Loader from "@/components/Loader.vue";

import IconSearch from "@/components/icons/IconSearch.vue";

const props = defineProps<{
  weatherReport: WeatherReportState;
}>();

const { t, locale } = useI18n();
const locations = useLocationsStore();
const weatherReport = useWeatherReportStore();

const locationName = ref("");
const timer = ref<number | NodeJS.Timeout | null>(null); // Specify the type of timer

const onSearch = (event: Event) => {
  timer.value !== null && clearTimeout(timer.value);

  const value = (event.target as HTMLInputElement)?.value;

  timer.value = setTimeout(() => {
    locationName.value = value;

    if (value.length > 2) {
      const params: RequestParams = {
        q: value,
        units: "metric",
        lang: locale.value,
      };

      locations.searchLocations(props.weatherReport.id, params);
    }
  }, 500);
};

const onSelect = (location: LocationsData) => {
  const params: RequestParams = {
    lat: location.coord.lat,
    lon: location.coord.lon,
    units: "metric",
    lang: locale.value,
  };
  weatherReport.getWeatherReport(props.weatherReport.id, params);
  locations.clearLocation();
  locationName.value = "";
};
</script>

<template>
  <div class="search__wrapper">
    <input
      :placeholder="t('weatherReport.searchInputPlaceholder')"
      class="input"
      :value="locationName"
      @input="onSearch"
    />

    <Loader
      class="search__icon"
      v-if="
        locations.loading &&
        locations.weatherReportId === props.weatherReport.id
      "
    />
    <IconSearch class="search__icon" v-else />

    <div
      class="locations__list"
      v-if="
        locations.data.length &&
        locations.weatherReportId === props.weatherReport.id
      "
    >
      <div
        class="locations__list__item"
        :key="location.coord.lat"
        v-for="location in locations.data"
        @click="onSelect(location)"
      >
        <span>{{ location.name }}</span>
        <span>{{ location?.sys?.country }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.search__icon {
  height: 24px;
  width: 24px;
  position: absolute;
  left: 12px;
}

.input {
  padding: 16px 24px 16px 48px;
  margin: 0;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #222;
}

.input:focus,
.input:focus-visible {
  border: none;
  outline: none;
}

.locations__list {
  z-index: 1;
  border-radius: 8px;
  position: absolute;
  border: none;
  top: 64px;
  width: 100%;
  background-color: white;
  gap: 12px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
}

.locations__list__item {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.locations__list__item:hover {
  cursor: pointer;
  font-weight: bold;
}
</style>
