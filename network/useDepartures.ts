import { impactAsync, ImpactFeedbackStyle, notificationAsync, NotificationFeedbackType } from 'expo-haptics';
import { useQuery } from 'react-query';

import { useLocationContext } from '../components/LocationContext';
import { useSettingsContext } from '../components/SettingsContext';
import { BkkService } from '../services/bkk.service';

const bkkService = new BkkService();

export function useDepartures() {
  const { getRadius, getHapticsEnabled } = useSettingsContext();
  const { getLocation, granted, location } = useLocationContext();
  return useQuery(
    'departures',
    async () => {
      const location = getLocation();
      if (!location || !granted) return;
      try {
        return await bkkService.getDepartures(location.lat, location.lon, getRadius());
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    {
      enabled: granted && !!location,
      onSuccess: async () => {
        if (getHapticsEnabled()) await impactAsync(ImpactFeedbackStyle.Light);
      },
      onError: async () => {
        if (getHapticsEnabled()) await notificationAsync(NotificationFeedbackType.Error);
      },
      refetchInterval: 5000,
    }
  );
}
