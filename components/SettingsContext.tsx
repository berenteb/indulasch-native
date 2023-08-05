import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from 'expo-router';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

export const SettingsContext = createContext({
  hapticsEnabled: true,
  setHapticsEnabled: (_: boolean) => {},
  getHapticsEnabled: () => true as boolean,
  radius: 400,
  getRadius: () => 400 as number,
  setRadius: (_: number) => {},
});

const STORAGE_KEY = '@indulasch';

SplashScreen.preventAutoHideAsync();

export function SettingsProvider({ children }: PropsWithChildren) {
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [storageLoading, setStorageLoading] = useState(true);
  const [radius, setRadius] = useState(400);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const { radius: storedRadius, hapticsEnabled: storedHapticsEnabled } = JSON.parse(storedData);
          setRadius(storedRadius);
          setHapticsEnabled(storedHapticsEnabled);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData().finally(() => setStorageLoading(false));
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ radius, hapticsEnabled }));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    saveData();
  }, [radius, hapticsEnabled]);

  useEffect(() => {
    if (!storageLoading) SplashScreen.hideAsync();
  }, [storageLoading]);

  if (storageLoading) return null;

  return (
    <SettingsContext.Provider
      value={{
        hapticsEnabled,
        getHapticsEnabled: () => hapticsEnabled,
        setHapticsEnabled,
        radius,
        setRadius,
        getRadius: () => radius,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettingsContext = () => useContext(SettingsContext);
