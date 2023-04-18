import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../../View/Dashboard/Home';
import DailyRoutine from '../../View/Dashboard/Routine';

const HomeStack = createNativeStackNavigator();

function OnboardingNavigator() {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='Home'
        >
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="DailyRoutine" component={DailyRoutine} />
        </HomeStack.Navigator>
    );
}

export default OnboardingNavigator;