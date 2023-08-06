import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
    <View>
      <MapView style={styles.map} region={region} onTouchStart={() => setIsManual(true)} onRegionChange={setRegion}>
        <VehicleMarker
          routeStyle={vehicle.style}
          alert={vehicle.alert}
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
        />
      </MapView>
      {isManual && (
        <Button
          style={styles.button}
          onPress={() => {
            setIsManual(false);
          }}
          leftIcon='filter-center-focus'
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 5,
    right: 5,
    gap: 0,
  },
});
