import { useEffect, useState } from 'react';
import MapView, { Region } from 'react-native-maps';

import { Style } from '../types/departures.type';
import { Button } from './Button';
import { VehicleMarker } from './VehicleMarker';

interface VehicleMapProps {
  location: Pick<Region, 'latitude' | 'longitude'>;
  vehicle: {
    style: Style;
    alert: string[] | undefined;
  };
}

export function VehicleMap({ location, vehicle }: VehicleMapProps) {
  const [isManual, setIsManual] = useState(false);
  const [region, setRegion] = useState<Region>({
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    ...location,
  });

  useEffect(() => {
    if (isManual) return;
    setRegion({ latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta, ...location });
  }, [location, isManual]);

  return (
    <MapView
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column-reverse',
      }}
      region={region}
      onTouchStart={() => setIsManual(true)}
      onRegionChange={setRegion}
    >
      <VehicleMarker
        routeStyle={vehicle.style}
        alert={vehicle.alert}
        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
      />
      {isManual && (
        <Button
          onPress={() => {
            setIsManual(false);
          }}
          leftIcon='filter-center-focus'
        />
      )}
    </MapView>
  );
}
