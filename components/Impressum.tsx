import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from './Themed';

export function Impressum() {
  const gray = useThemeColor({}, 'secondaryText');

  return (
    <View style={styles.container}>
      <Text style={{ color: gray }}>
        Made with <MaterialCommunityIcons name='heart' size={15} color='red' /> by Bálint Berente & Kir-Dev
      </Text>
      <Text style={{ color: gray }}>InduláSch v{Constants.expoConfig?.version}</Text>
      {Updates.channel !== 'production' && <Text style={{ color: gray }}>Channel: {Updates.channel}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
