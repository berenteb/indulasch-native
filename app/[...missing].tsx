import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
import { Content } from '../components/Content';
import { Screen } from '../components/Screen';
import { ScreenTitle } from '../components/ScreenTitle';
import { useThemeColor } from '../components/Themed';
import { Text } from '../components/Themed';

export default function NotFoundScreen() {
  const red = useThemeColor({}, 'red');
  const { bottom } = useSafeAreaInsets();
  const { back } = useRouter();
  return (
    <Screen style={{ paddingBottom: bottom }}>
      <ScreenTitle>Ez milyen oldal?</ScreenTitle>
      <Content style={styles.content}>
        <MaterialIcons name='error' color={red} size={50} />
        <Text style={styles.text}>Az alkalmazás egy nem létező képernyőjére érkeztél.</Text>
      </Content>
      <View style={styles.buttonContainer}>
        <Button onPress={back} leftIcon='chevron-left'>
          Vissza
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSansBold',
  },
  subText: {
    color: 'gray',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
});
