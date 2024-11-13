import axios from "axios";

export interface RequestParams {
  q?: string;
  lon?: number;
  lat?: number;
  units?: "standard" | "metric" | "imperial";
  lang: string;
}

export const useApiFetch = () => {
  const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  const getRequest = async (endPoint: string, params?: RequestParams) => {
    try {
      return await httpClient.get(endPoint, {
        params: {
          ...params,
          appid: import.meta.env.VITE_API_KEY,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { getRequest };
};
