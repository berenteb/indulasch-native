import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { LocationProvider } from '../components/LocationContext';
import { SettingsProvider } from '../components/SettingsContext';

export { ErrorBoundary } from '../components/ErrorBoundary';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    OpenSans: require('../assets/fonts/OpenSans-Regular.ttf'),
    OpenSansItalic: require('../assets/fonts/OpenSans-Italic.ttf'),
    OpenSansBold: require('../assets/fonts/OpenSans-Bold.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

export const unstable_settings = {
  initialRouteName: 'index',
};

const queryClient = new QueryClient();

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <LocationProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name='index' />
              <Stack.Screen name='details' />
              <Stack.Screen name='settings' />
            </Stack>
          </ThemeProvider>
        </LocationProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}
