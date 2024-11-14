<script setup lang="ts">
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

import { appRouters, WEATHER_REPORTS_MAX_AMOUNT } from "@/constants";

import { useWeatherReportsStore } from "@/stores/weatherReports";

import LanguageSelect from "@/components/LanguageSelect.vue";
import Button from "@/components/Button.vue";

import IconAdd from "@/components/icons/IconAdd.vue";

const { t } = useI18n();
const route = useRoute();
const weatherReports = useWeatherReportsStore();
</script>

<template>
  <div class="header">
    <nav class="header__links">
      <RouterLink :to="appRouters.HOME">
        {{ t("header.links.home") }}
      </RouterLink>

      <RouterLink :to="appRouters.FAVORITE">
        {{ t("header.links.favorite") }}
      </RouterLink>
    </nav>

    <div class="header__buttons">
      <Button
        v-if="
          route.fullPath === appRouters.HOME &&
          weatherReports.currentReports.length < WEATHER_REPORTS_MAX_AMOUNT
        "
        @click="weatherReports.createReport"
        :icon="IconAdd"
      />
      <LanguageSelect />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.header__links {
  display: flex;
  gap: 10px;
}

.header__links a {
  text-decoration: none;
  color: #777777;
  font-weight: 600;
  font-size: 23px;
}

.header__links a.router-link-active {
  color: #222;
}

.header__buttons {
  display: flex;
  gap: 20px;
}

@media (max-width: 700px) {
  .header__links a {
    font-size: 16px;
  }
}
</style>
