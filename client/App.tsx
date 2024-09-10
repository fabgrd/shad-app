import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./src/redux/store";
import * as SplashScreen from 'expo-splash-screen';
import RouteNavigator from './src/navigation/RouteNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  const customFonts = {
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
    'Roboto-ThinItalic': require('./assets/fonts/Roboto-ThinItalic.ttf'),
  };

  async function _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    console.log('Fonts loaded');
    setAppLoaded(true);
  }

  useEffect(() => {
    async function loadFonts() {
      await _loadFontsAsync();
    }
    loadFonts();
  }, []);

  useEffect(() => {
    if (appLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appLoaded]);

  useEffect(() => {
    // Purger le cache de redux-persist
    persistor.purge().then(() => {
      console.log('Cache purged');
    }).catch((error) => {
      console.error('Error purging cache:', error);
    });
  }, []);

  if (!appLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouteNavigator />
      </PersistGate>
    </Provider>
  );
}
