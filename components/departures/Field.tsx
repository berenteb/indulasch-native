import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';

import { Departure } from '../../types/departures.type';
import { Glass } from '../Glass';
import { useThemeColor } from '../Themed';
import { Headsign } from './Headsign';
import { Route } from './Route';
import { TimeText } from './TimeText';

interface FieldProps {
  departure: Departure;
}

export function Field({ departure }: FieldProps) {
  const backgroundColor = useThemeColor({}, 'contentBackground');
  const scheme = useColorScheme() ?? 'light';
  const frostTint = scheme === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.72)';
  const router = useRouter();
  const { style, headsign, alert, departureText, isDelayed } = departure;
  return (
    <Glass
      isInteractive
      tintColor={frostTint}
      glassEffectStyle='regular'
      fallback='blur'
      fallbackColor={backgroundColor}
      style={styles.glass}
    >
      <Pressable
        onPress={() => {
          router.push({
            pathname: 'details',
            params: { departureTripId: departure.tripId },
          });
        }}
        style={styles.pressable}
        accessibilityRole='button'
      >
        <Route style={style} alert={alert} />
        <Headsign headsign={headsign} />
        <TimeText departureText={departureText} isDelayed={isDelayed} />
      </Pressable>
    </Glass>
  );
}

const styles = StyleSheet.create({
  glass: {
    marginTop: 10,
    borderRadius: 16,
    width: '100%',
  },
  pressable: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
});
