import React from 'react'

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// View
import Welcome from '../../src/View/Welcome';

// Auth View
import AuthNavigator from '../../src/navigation/AuthNavigator';

// Onboarding
import OnboardingNavigator from '../../src/navigation/OnboardingNavigator';

// Dashboard
import DashboardNavigator from '../../src/navigation/Dashboard/DashboardNavigator';

// Expo
import { StatusBar } from 'expo-status-bar';

// Redux
import { useSelector } from 'react-redux';

import { RootState } from '../../src/redux/store'

type Props = {}

const RouteNavigator = (props: Props) => {
    const RouteStack = createNativeStackNavigator();
    const isLogged = useSelector((state: RootState) => state.user.isLogged)

    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <RouteStack.Navigator>
                {!isLogged &&
                    <>
                        {/* Welcome */}
                        <RouteStack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                        {/* Auth */}
                        <RouteStack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
                        {/* Onboarding */}
                        <RouteStack.Screen name="Onboarding" component={OnboardingNavigator} options={{ headerShown: false }} />
                    </>
                }
                {/* Dashboard */}
                {isLogged && <RouteStack.Screen name="Dashboard" component={DashboardNavigator} options={{ headerShown: false }} />}
            </RouteStack.Navigator>
        </NavigationContainer>
    )
}

export default RouteNavigator