import type { DefineComponent } from "vue";

import type { WeatherIconCode } from "@/stores/weatherReport";

import IconSnowDay from "@/components/icons/IconSnowDay.vue";
import IconSnowNight from "@/components/icons/IconSnowNight.vue";
import IconMistDay from "@/components/icons/IconMistDay.vue";
import IconMistNight from "@/components/icons/IconMistNight.vue";
import IconRainDay from "@/components/icons/IconRainDay.vue";
import IconRainNight from "@/components/icons/IconRainNight.vue";
import IconClearSkyDay from "@/components/icons/IconClearSkyDay.vue";
import IconClearSkyNight from "@/components/icons/IconClearSkyNight.vue";
import IconFewCloudsDay from "@/components/icons/IconFewCloudsDay.vue";
import IconFewCloudsNight from "@/components/icons/IconFewCloudsNight.vue";
import IconShowerRainDay from "@/components/icons/IconShowerRainDay.vue";
import IconShowerRainNight from "@/components/icons/IconShowerRainNight.vue";
import IconThunderstormDay from "@/components/icons/IconThunderstormDay.vue";
import IconThunderstormNight from "@/components/icons/IconThunderstormNight.vue";
import IconBrokenCloudsDay from "@/components/icons/IconBrokenCloudsDay.vue";
import IconBrokenCloudsNight from "@/components/icons/IconBrokenCloudsNight.vue";
import IconScatteredCloudsDay from "@/components/icons/IconScatteredCloudsDay.vue";
import IconScatteredCloudsNight from "@/components/icons/IconScatteredCloudsNight.vue";

export const appRouters = {
  HOME: "/",
  FAVORITE: "/favorite",
};

export const apiRouters = {
  FIND: "/find",
  WEATHER: "/weather",
  FORECAST: "/forecast",
  ONECALL: "/onecall",
};

export const weatherIcons: Record<
  WeatherIconCode,
  DefineComponent<{}, {}, any>
> = {
  "01d": IconClearSkyDay,
  "01n": IconClearSkyNight,
  "02d": IconFewCloudsDay,
  "02n": IconFewCloudsNight,
  "03d": IconScatteredCloudsDay,
  "03n": IconScatteredCloudsNight,
  "04d": IconBrokenCloudsDay,
  "04n": IconBrokenCloudsNight,
  "09d": IconShowerRainDay,
  "09n": IconShowerRainNight,
  "10d": IconRainDay,
  "10n": IconRainNight,
  "11d": IconThunderstormDay,
  "11n": IconThunderstormNight,
  "13d": IconSnowDay,
  "13n": IconSnowNight,
  "50d": IconMistDay,
  "50n": IconMistNight,
};

export const WEATHER_REPORTS_MIN_AMOUNT: number = 1;
export const WEATHER_REPORTS_MAX_AMOUNT: number = 5;

export const FAVORITE_REPORTS_MAX_AMOUNT: number = 5;

export const localStorageKeys = {
  COORDINATES: "coordinates",
} as const;
