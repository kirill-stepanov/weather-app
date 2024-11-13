import { defineStore } from "pinia";

import { apiRouters } from "@/constants";

import { useApiFetch, type RequestParams } from "@/hooks/useApiFetch";

export interface LocationsState {
  weatherReportId: string;
  loading: boolean;
  data: LocationsData[];
}

export interface LocationsData {
  name: string;
  sys: {
    country: string;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

export const useLocationsStore = defineStore("locations", {
  state: (): LocationsState => ({
    weatherReportId: "",
    loading: false,
    data: [],
  }),
  actions: {
    async searchLocations(weatherReportId: string, params: RequestParams) {
      this.weatherReportId = weatherReportId;

      const { getRequest } = useApiFetch();
      this.loading = true;

      const response = await getRequest(apiRouters.FIND, params).finally(() => {
        this.loading = false;
      });

      this.data = response?.data?.list?.map((location: LocationsData) => ({
        name: location.name,
        sys: {
          country: location.sys.country,
        },
        coord: {
          lat: location.coord.lat,
          lon: location.coord.lon,
        },
      }));
    },
    clearLocation() {
      this.data = [];
    },
  },
});
