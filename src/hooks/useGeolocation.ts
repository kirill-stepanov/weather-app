import { useI18n } from "vue-i18n";

import { useWeatherReportStore } from "@/stores/weatherReport";
import { useWeatherReportsStore } from "@/stores/weatherReports";

import type { RequestParams } from "@/hooks/useApiFetch";

export const useGeolocation = () => {
  const { locale } = useI18n();

  const weatherReport = useWeatherReportStore();
  const weatherReports = useWeatherReportsStore();

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const onSuccess = (position: GeolocationPosition) => {
    const coordinate = position.coords;

    const params: RequestParams = {
      lat: coordinate.latitude,
      lon: coordinate.longitude,
      units: "metric",
      lang: locale.value,
    };

    weatherReport.getWeatherReport(weatherReports.currentReports[0].id, params);
  };

  const onError = (error: GeolocationPositionError) => {
    console.warn(error.message);
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  };

  return { getUserLocation };
};
