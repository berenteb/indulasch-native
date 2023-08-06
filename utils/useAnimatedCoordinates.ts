import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { LatLng } from 'react-native-maps';

export function useAnimatedCoordinates(value: LatLng) {
  const animatedCoords = useRef(new Animated.ValueXY({ x: value.latitude, y: value.longitude })).current;
  const [coords, setCoords] = useState<LatLng>(value);

  useEffect(() => {
    Animated.timing(animatedCoords, {
      toValue: { x: value.latitude, y: value.longitude },
      useNativeDriver: true,
    }).start();
  }, [value]);

  useEffect(() => {
    animatedCoords.addListener((newCoords) => setCoords({ latitude: newCoords.x, longitude: newCoords.y }));
  }, []);

  return coords;
}
