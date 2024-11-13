import { weatherIcons } from "@/constants";

import type { DailyForecast, WeatherIconCode } from "@/stores/weatherReport";

interface FormattedDateParams {
  date: number;
  showWeekday?: boolean;
  showHour?: boolean;
}

export const uniqueDays = (data: DailyForecast[]) => {
  const getDateOnly = (timestamp: number) =>
    new Date(timestamp * 1000).toISOString().split("T")[0];

  const seenDates = new Set();

  return data.filter((item) => {
    const date = getDateOnly(item.dt);

    if (seenDates.has(date)) {
      return false;
    }
    seenDates.add(date);
    return true;
  });
};

export const formattedDate = (params: FormattedDateParams) => {
  const timestamp = params.date * 1000;
  const newDate = new Date(timestamp);

  const formattedDate = new Date(newDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    weekday: params.showWeekday ? "short" : undefined,
    hour: params.showHour ? "numeric" : undefined,
  });

  return formattedDate;
};

export const roundNumber = (num: number = 0) => {
  return Math.round(num);
};

export const getWeatherIconComponent = (iconCode: WeatherIconCode = "01d") => {
  return weatherIcons[iconCode];
};
