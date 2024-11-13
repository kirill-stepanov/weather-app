import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

import {
  FAVORITE_REPORTS_MAX_AMOUNT,
  WEATHER_REPORTS_MAX_AMOUNT,
  WEATHER_REPORTS_MIN_AMOUNT,
} from "@/constants";

import {
  type WeatherReportState,
  type WeatherTypes,
} from "@/stores/weatherReport";

interface WeatherReportsState {
  amount: number;
  currentReports: WeatherReportState[];
  favorites: WeatherReportState[];
}

export const useWeatherReportsStore = defineStore("weatherReports", {
  state: (): WeatherReportsState => ({
    amount: WEATHER_REPORTS_MIN_AMOUNT,
    currentReports: [],
    favorites: [],
  }),
  actions: {
    async createReport() {
      if (this.currentReports.length < WEATHER_REPORTS_MAX_AMOUNT) {
        this.currentReports.push({
          id: uuidv4(),
          type: "day",
          loading: false,
          timezone: null,
          coordinate: null,
          current: null,
          daily: null,
          hourly: null,
        });
      }
    },
    async createDefaultReports() {
      for (let i = 0; i < WEATHER_REPORTS_MIN_AMOUNT; i++) {
        this.createReport();
      }
    },
    async updateCurrentReport(report: WeatherReportState) {
      this.currentReports = this.currentReports.map((item) =>
        item.id === report.id ? { ...item, ...report } : item
      );
    },
    async removeReport(id: string) {
      this.currentReports = this.currentReports.filter(
        (item) => item.id !== id
      );
    },
    async updateFavoriteReport(report: WeatherReportState) {
      const reportIndex = this.favorites.findIndex(
        (item) =>
          item.coordinate?.lat === report.coordinate?.lat &&
          item.coordinate?.lon === report.coordinate?.lon
      );

      if (
        reportIndex === -1 &&
        this.favorites.length < FAVORITE_REPORTS_MAX_AMOUNT
      ) {
        this.favorites.push(report);
      } else {
        this.favorites = this.favorites.filter(
          (item) =>
            item.coordinate?.lat !== report.coordinate?.lat &&
            item.coordinate?.lon !== report.coordinate?.lon
        );
      }
    },
    async updateWeatherType(id: string, type: WeatherTypes) {
      this.currentReports = this.currentReports.map((item) =>
        item.id === id ? { ...item, type: type } : item
      );

      this.favorites = this.favorites.map((item) =>
        item.id === id ? { ...item, type: type } : item
      );
    },
  },
});
