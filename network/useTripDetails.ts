import { useQuery } from 'react-query';

import { BkkService } from '../services/bkk.service';
import { TripDetailsData } from '../types/bkk.type';

const bkkService = new BkkService();

export function useTripDetails(tripId: string | undefined) {
  return useQuery<TripDetailsData | undefined>(
    ['tripDetails', tripId],
    async () => {
      if (!tripId) return;
      return await bkkService.getTripDetails(tripId);
    },
    {
      refetchInterval: 5000,
    }
  );
}
