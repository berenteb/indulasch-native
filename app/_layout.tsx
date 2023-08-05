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

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

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

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  const colorScheme = useColorScheme();

  if (!loaded) return null;

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
