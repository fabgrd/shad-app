import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Achievements from '../../View/Dashboard/Profile/Achievements';
import Profile from '../../View/Dashboard/Profile/Profile';


const ProfileStack = createNativeStackNavigator();

function OnboardingNavigator() {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='Profile'
        >
            <ProfileStack.Screen name="Profile" component={Profile} />
            <ProfileStack.Screen name="Achievements" component={Achievements} />
        </ProfileStack.Navigator>
    );
}

export default OnboardingNavigator;