import { defineStore } from "pinia";

import { useApiFetch, type RequestParams } from "@/hooks/useApiFetch";

import { apiRouters } from "@/constants";

import { useWeatherReportsStore } from "@/stores/weatherReports";

export interface WeatherReportState {
  id: string;
  loading: boolean;
  timezone: string | null;
  type: WeatherTypes;
  coordinate: Coordinate | null;
  current: CurrentWeather | null;
  daily: DailyForecast[] | null;
  hourly: HourlyForecast[] | null;
}

export interface Coordinate {
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: WeatherIconCode;
    }
  ];
}

export interface DailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: WeatherIconCode;
    }
  ];
  clouds: number;
  pop: number;
  uvi: number;
}

export interface HourlyForecast {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: WeatherIconCode;
    }
  ];
  pop: number;
}

export type WeatherTypes = "day" | "night";

export type WeatherIconCode =
  | "01d"
  | "01n"
  | "02d"
  | "02n"
  | "03d"
  | "03n"
  | "04d"
  | "04n"
  | "09d"
  | "09n"
  | "10d"
  | "10n"
  | "11d"
  | "11n"
  | "13d"
  | "13n"
  | "50d"
  | "50n";

export type WeatherReportType = "current" | "favorite";

export const useWeatherReportStore = defineStore("weatherReport", {
  state: (): WeatherReportState => ({
    id: "",
    loading: false,
    type: "day",
    timezone: null,
    coordinate: null,
    current: null,
    daily: null,
    hourly: null,
  }),
  actions: {
    async getWeatherReport(
      id: string,
      params: RequestParams,
      type: WeatherReportType = "current"
    ) {
      const { getRequest } = useApiFetch();
      const weatherReportsStore = useWeatherReportsStore();

      this.loading = true;
      this.id = id;
      const response = await getRequest(apiRouters.ONECALL, params).finally(
        () => {
          this.loading = false;
        }
      );
      this.timezone = response?.data.timezone;
      this.coordinate = {
        lat: response?.data.lat,
        lon: response?.data.lon,
      };
      this.current = response?.data.current;
      this.daily = response?.data.daily?.slice(1, 6);
      this.hourly = response?.data.hourly?.slice(0, 9);

      const newReport: WeatherReportState = {
        id: id,
        loading: false,
        type: "day",
        timezone: response?.data.timezone,
        coordinate: {
          lat: response?.data.lat,
          lon: response?.data.lon,
        },
        current: response?.data.current,
        daily: response?.data.daily?.slice(1, 6),
        hourly: response?.data.hourly?.slice(0, 9),
      };

      type === "current" && weatherReportsStore.updateCurrentReport(newReport);

      type === "favorite" &&
        weatherReportsStore.updateFavoriteReport(newReport);
    },
  },
});
