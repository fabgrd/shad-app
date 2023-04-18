import React, { useEffect, useState } from 'react';

// Fonts
import * as Font from 'expo-font';

// Redux
import { Provider } from 'react-redux'
import store from './src/redux/store'

// Redux Persist
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./src/redux/store";

// Splash Screen
import * as SplashScreen from 'expo-splash-screen';

// Navigation
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

  function _loadFontsAsync() {
    Font.loadAsync(customFonts)
      .finally(() => {
        console.log('Fonts loaded');
        setAppLoaded(true);
      }
      );
  }

  useEffect(() => {
    async function loadFonts() {
      _loadFontsAsync()
    }
    loadFonts();
  }, []);

  useEffect(() => {
    if (appLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appLoaded]);

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