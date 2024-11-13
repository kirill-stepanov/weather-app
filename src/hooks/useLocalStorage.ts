import type { Coordinate } from "@/stores/weatherReport";

import { FAVORITE_REPORTS_MAX_AMOUNT, localStorageKeys } from "@/constants";

type LocalStorageKey = (typeof localStorageKeys)[keyof typeof localStorageKeys];

export const useLocalStorage = () => {
  const setItem = (key: LocalStorageKey, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = (key: LocalStorageKey) => {
    return JSON.parse(localStorage.getItem(key) || "[]");
  };

  const removeItem = (key: LocalStorageKey) => localStorage.removeItem(key);

  const saveCoordinateToLocalStorage = (coordinate: Coordinate) => {
    const existedData = getItem(localStorageKeys.COORDINATES);

    existedData.push(coordinate);

    existedData.length <= FAVORITE_REPORTS_MAX_AMOUNT &&
      setItem(localStorageKeys.COORDINATES, existedData);
  };

  const removeCoordinateFromLocalStorage = (coordinateToRemove: Coordinate) => {
    const existingCoordinates: Coordinate[] = getItem(
      localStorageKeys.COORDINATES
    );

    const updatedCoordinates = existingCoordinates.filter(
      (coordinate) =>
        coordinate.lat !== coordinateToRemove.lat ||
        coordinate.lon !== coordinateToRemove.lon
    );

    setItem(localStorageKeys.COORDINATES, updatedCoordinates);
  };

  const isCoordinateSaved = (coordinate: Coordinate) => {
    const data = getItem(localStorageKeys.COORDINATES);

    return (
      Array.isArray(data) &&
      data.some(
        (item: Coordinate) =>
          item.lat === coordinate.lat && item.lon === coordinate.lon
      )
    );
  };

  const clear = () => localStorage.clear();

  return {
    setItem,
    getItem,
    removeItem,
    clear,
    isCoordinateSaved,
    saveCoordinateToLocalStorage,
    removeCoordinateFromLocalStorage,
  };
};
