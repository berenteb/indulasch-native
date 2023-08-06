import { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';

import { Style } from '../types/departures.type';
import { Button } from './Button';
import { useLocationContext } from './LocationContext';
import { UserMarker } from './UserMarker';
import { VehicleMarker } from './VehicleMarker';

interface VehicleMapProps {
  vehiclePosition: Pick<Region, 'latitude' | 'longitude'>;
  vehicle: {
    style: Style;
    alert: string[] | undefined;
  };
}

export function VehicleMap({ vehiclePosition, vehicle }: VehicleMapProps) {
  const { location } = useLocationContext();
  const [followVehicle, setFollowVehicle] = useState(true);
  const [followUser, setFollowUser] = useState(false);
  const userLocation = location
    ? { latitude: parseFloat(location.lat), longitude: parseFloat(location.lon) }
    : undefined;
  const [region, setRegion] = useState<Region>({
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    ...vehiclePosition,
  });

  useEffect(() => {
    if (followVehicle)
      setRegion({ latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta, ...vehiclePosition });
    if (followUser && userLocation)
      setRegion({ latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta, ...userLocation });
  }, [vehiclePosition, followVehicle, followUser]);

  return (
    <View>
      <MapView
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        initialRegion={region}
        region={followVehicle || followUser ? region : undefined}
        onTouchStart={() => {
          setFollowUser(false);
          setFollowVehicle(false);
        }}
        onRegionChange={setRegion}
      >
        <VehicleMarker
          routeStyle={vehicle.style}
          alert={vehicle.alert}
          coordinate={{ latitude: vehiclePosition.latitude, longitude: vehiclePosition.longitude }}
        />
        {location && (
          <UserMarker coordinate={{ latitude: parseFloat(location.lat), longitude: parseFloat(location.lon) }} />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        {!followVehicle && (
          <Button
            style={styles.button}
            onPress={() => {
              setFollowVehicle(true);
              setFollowUser(false);
            }}
            leftIcon='filter-center-focus'
          />
        )}
        {!followUser && (
          <Button
            style={styles.button}
            onPress={() => {
              setFollowUser(true);
              setFollowVehicle(false);
            }}
            leftIcon='navigation'
          />
        )}
      </View>
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
    width: 50,
    height: 50,
    gap: 0,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    gap: 5,
  },
});
