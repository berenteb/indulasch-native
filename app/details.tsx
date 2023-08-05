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
import { Text } from '../components/Themed';
import { TitleBar } from '../components/TitleBar';
import { useDepartures } from '../network/useDepartures';

export default function Details() {
  const router = useRouter();
  const sw = useRef<ScrollView>(null);
  const params = useSearchParams();
  const { data } = useDepartures();

  const selectedDeparture = useMemo(() => {
    return data?.departures.find((d) => d.tripId === params.departureTripId);
  }, [params.departureTripId]);

  const departureText = data?.departures.find((d) => d.tripId === params.departureTripId)?.departureText;

  if (!selectedDeparture) {
    router.back();
    return null;
  }
  const { style, isDelayed, headsign, alert } = selectedDeparture;
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
