import * as Location from "expo-location";
import { LocationObject, LocationSubscription } from "expo-location";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type LocationType = { lat: string; lon: string } | undefined;

type LocationContextType = {
  granted: boolean;
  getLocation: () => LocationType;
  location: LocationType;
};

export const LocationContext = createContext<LocationContextType>({
  granted: false,
  getLocation: () => undefined,
  location: undefined,
});

export function LocationProvider({ children }: PropsWithChildren) {
  const [granted, setGranted] = useState(false);
  const [location, setLocation] = useState<LocationObject>();
  const [locationSubscription, setLocationSubscription] =
    useState<LocationSubscription>();

  useEffect(() => {
    const setup = async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      setGranted(granted);
      if (!granted) return;
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 1,
          timeInterval: 5000,
        },
        setLocation
      );
      setLocationSubscription(subscription);
    };
    setup();
    return () => locationSubscription?.remove();
  }, []);

  const getLocation = () => {
    if (!location) return undefined;
    return {
      lat: location.coords.latitude.toString(),
      lon: location.coords.longitude.toString(),
    };
  };

  return (
    <LocationContext.Provider
      value={{
        granted,
        getLocation,
        location: getLocation(),
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export const useLocationContext = () => useContext(LocationContext);
