import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileUser from '../../View/Dashboard/Profile/ProfileUser';
import League from '../../View/Dashboard/League';


const LeagueStack = createNativeStackNavigator();

function OnboardingNavigator() {
    return (
        <LeagueStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='Profile'
        >
            <LeagueStack.Screen name="League" component={League} />
            <LeagueStack.Screen name="ProfileUser" component={ProfileUser} />
        </LeagueStack.Navigator>
    );
}

export default OnboardingNavigator;