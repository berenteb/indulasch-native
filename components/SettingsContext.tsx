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
  departuresLimit: 30,
  getDeparturesLimit: () => 30 as number,
  setDeparturesLimit: (_: number) => {},
});

const STORAGE_KEY = '@indulasch';

SplashScreen.preventAutoHideAsync();

export function SettingsProvider({ children }: PropsWithChildren) {
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [storageLoading, setStorageLoading] = useState(true);
  const [radius, setRadius] = useState(400);
  const [departuresLimit, setDeparturesLimit] = useState(30);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const {
            radius: storedRadius,
            hapticsEnabled: storedHapticsEnabled,
            departuresLimit: storedDeparturesLimit,
          } = JSON.parse(storedData);
          setRadius(storedRadius ?? 400);
          setDeparturesLimit(storedDeparturesLimit ?? 30);
          setHapticsEnabled(storedHapticsEnabled ?? true);
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
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ radius, hapticsEnabled, departuresLimit }));
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
        departuresLimit,
        setDeparturesLimit,
        getDeparturesLimit: () => departuresLimit,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettingsContext = () => useContext(SettingsContext);
