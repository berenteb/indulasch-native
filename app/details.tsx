import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useSearchParams } from 'expo-router';
import { useMemo, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BackButton } from '../components/BackButton';
import { Content } from '../components/Content';
import { Headsign } from '../components/departures/Headsign';
import { Route } from '../components/departures/Route';
import { TimeText } from '../components/departures/TimeText';
import { Screen } from '../components/Screen';
import { ScreenTitle } from '../components/ScreenTitle';
import { Text, useThemeColor } from '../components/Themed';
import { TitleBar } from '../components/TitleBar';
import { VehicleMap } from '../components/VehicleMap';
import { useDepartures } from '../network/useDepartures';
import { useTripDetails } from '../network/useTripDetails';

export default function Details() {
  const textColor = useThemeColor({}, 'primaryText');
  const router = useRouter();
  const sw = useRef<ScrollView>(null);
  const params = useSearchParams();
  const departures = useDepartures();
  const tripDetails = useTripDetails(
    Array.isArray(params.departureTripId) ? params.departureTripId[0] : params.departureTripId
  );

  const selectedDeparture = useMemo(() => {
    return departures.data?.departures.find((d) => d.tripId === params.departureTripId);
  }, [params.departureTripId]);

  const departureText = departures.data?.departures.find((d) => d.tripId === params.departureTripId)?.departureText;

  if (!selectedDeparture) {
    router.back();
    return null;
  }
  const { style, isDelayed, headsign, alert } = selectedDeparture;
  const vehicle = tripDetails.data?.entry?.vehicle;
  const location = vehicle?.location;
  return (
    <Screen>
      <TitleBar>
        <BackButton />
      </TitleBar>
      <ScreenTitle>Részletek</ScreenTitle>
      <ScrollView ref={sw}>
        <Content>
          <View style={styles.horizontal}>
            <Route style={style} />
            <TimeText isDelayed={isDelayed} departureText={departureText} />
          </View>
          <Headsign headsign={headsign} style={styles.headsign} />
          {!!alert && alert.length > 0 && (
            <View style={styles.alertsContainer}>
              <View style={styles.alertsTitleContainer}>
                <MaterialIcons name='error' size={20} color='orange' />
                <Text style={styles.alertsTitle}>Figyelmeztetések</Text>
              </View>
              {alert.map((a, i) => (
                <Text style={styles.alertItem} key={i}>
                  {a}
                </Text>
              ))}
            </View>
          )}
        </Content>
        {location && (
          <Content style={{ height: 300 }}>
            <VehicleMap
              vehiclePosition={{ latitude: location.lat, longitude: location.lon }}
              vehicle={{ style, alert }}
            />
          </Content>
        )}
        {vehicle && (
          <Content>
            <View style={styles.horizontal}>
              <Text>{vehicle.label}</Text>
              <MaterialIcons
                name={vehicle.wheelchairAccessible ? 'accessible' : 'not-accessible'}
                size={25}
                color={textColor}
              />
            </View>
          </Content>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headsign: {
    textAlign: 'left',
    flex: 0,
  },
  alertsContainer: {
    gap: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  alertsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  alertsTitle: {
    color: 'orange',
  },
  alertItem: {},
});
