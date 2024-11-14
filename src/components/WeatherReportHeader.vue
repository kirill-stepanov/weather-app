<script setup lang="ts">
import { onMounted, onUpdated, ref } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

import { useWeatherReportsStore } from "@/stores/weatherReports";
import {
  useWeatherReportStore,
  type Coordinate,
  type WeatherReportState,
} from "@/stores/weatherReport";

import { useLocalStorage } from "@/hooks/useLocalStorage";

import {
  appRouters,
  FAVORITE_REPORTS_MAX_AMOUNT,
  WEATHER_REPORTS_MIN_AMOUNT,
} from "@/constants";

import Modal from "@/components/Global/Modal.vue";
import Button from "@/components/Global/Button.vue";
import WeatherTypeToggler from "@/components/WeatherTypeToggler.vue";
import SearchLocationInput from "@/components/SearchLocationInput.vue";

import IconDelete from "@/components/icons/IconDelete.vue";
import IconFavoriteChecked from "@/components/icons/IconFavoriteChecked.vue";
import IconFavoriteUnchecked from "@/components/icons/IconFavoriteUnchecked.vue";

const props = defineProps<{
  weatherReport: WeatherReportState;
}>();

const { t } = useI18n();
const route = useRoute();
const weatherReports = useWeatherReportsStore();
const weatherReportStore = useWeatherReportStore();
const {
  isCoordinateSaved,
  saveCoordinateToLocalStorage,
  removeCoordinateFromLocalStorage,
} = useLocalStorage();

const showSavedIcon = ref<boolean>(false);
const showDeleteModal = ref<boolean>(false);
const showFavoriteModal = ref<boolean>(false);

const handleShowDeleteModal = () => {
  showDeleteModal.value = !showDeleteModal.value;
};

const handleFavoriteDeleteModal = () => {
  showFavoriteModal.value = !showFavoriteModal.value;
};

const handleSubmit = () => {
  weatherReports.removeReport(props.weatherReport.id);
  handleShowDeleteModal();
};

onMounted(() => {
  showSavedIcon.value = props.weatherReport.coordinate
    ? isCoordinateSaved(props.weatherReport.coordinate)
    : false;
});

onUpdated(() => {
  showSavedIcon.value = props.weatherReport.coordinate
    ? isCoordinateSaved(props.weatherReport.coordinate)
    : false;
});

const toggleShowSavedIcon = (coordinate: Coordinate) => {
  if (showSavedIcon.value) {
    removeCoordinateFromLocalStorage(coordinate);
  } else {
    if (weatherReports.favorites.length < FAVORITE_REPORTS_MAX_AMOUNT) {
      saveCoordinateToLocalStorage(coordinate);
    } else {
      handleFavoriteDeleteModal();
    }
  }
  weatherReports.updateFavoriteReport(props.weatherReport);
  showSavedIcon.value = !showSavedIcon.value;
};
</script>

<template>
  <div class="header">
    <div>
      <SearchLocationInput
        :weatherReport="weatherReport"
        v-if="route.fullPath === appRouters.HOME"
      />
    </div>

    <div class="header__actions">
      <div v-if="weatherReport.coordinate && !weatherReportStore.loading">
        <Button
          @click="toggleShowSavedIcon(weatherReport.coordinate)"
          v-if="showSavedIcon"
          :icon="IconFavoriteChecked"
        />

        <Button
          @click="toggleShowSavedIcon(weatherReport.coordinate)"
          :icon="IconFavoriteUnchecked"
          v-else
        />
      </div>

      <Button
        @click="handleShowDeleteModal"
        :icon="IconDelete"
        v-if="
          weatherReports.currentReports.length > WEATHER_REPORTS_MIN_AMOUNT &&
          route.fullPath === appRouters.HOME
        "
      />

      <WeatherTypeToggler
        :id="props.weatherReport.id"
        :weatherType="props.weatherReport.type"
      />
    </div>
  </div>

  <Modal
    :showModal="showDeleteModal"
    :title="t('modals.delete.title')"
    :description="t('modals.delete.description')"
    :onSubmit="handleSubmit"
    :onCancel="handleShowDeleteModal"
  />

  <Modal
    :showModal="showFavoriteModal"
    :title="t('modals.favorite.title')"
    :description="
      t('modals.favorite.description', { amount: FAVORITE_REPORTS_MAX_AMOUNT })
    "
    :onCancel="handleFavoriteDeleteModal"
  />
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (max-width: 700px) {
  .header {
    flex-direction: column;
    align-items: baseline;
  }
}
</style>
