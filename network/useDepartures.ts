import axios from "axios";
import Constants from "expo-constants";
import {
  impactAsync,
  ImpactFeedbackStyle,
  notificationAsync,
  NotificationFeedbackType,
} from "expo-haptics";
import { useQuery } from "react-query";
import { useLocationContext } from "../components/LocationContext";
import { useSettingsContext } from "../components/SettingsContext";
import { DepartureDto } from "../types/departures.type";

export function useDepartures() {
  const { getRadius, getHapticsEnabled } = useSettingsContext();
  const { getLocation, granted, location } = useLocationContext();
  const apiUrl = Constants.expoConfig?.extra?.apiUrl;
  if (!apiUrl) throw new Error("No API URL is present");
  return useQuery(
    "departures",
    async () => {
      const location = getLocation();
      if (!location || !granted) return;
      const response = await axios.post<DepartureDto>(apiUrl, {
        lat: location.lat,
        lon: location.lon,
        radius: getRadius(),
      });
      return response.data;
    },
    {
      enabled: granted && !!location,
      onSuccess: async () => {
        if (getHapticsEnabled()) await impactAsync(ImpactFeedbackStyle.Light);
      },
      onError: async () => {
        if (getHapticsEnabled())
          await notificationAsync(NotificationFeedbackType.Error);
      },
      refetchInterval: 5000,
    }
  );
}
