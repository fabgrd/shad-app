import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../../View/Dashboard/Home';
import DailyRoutine from '../../View/Dashboard/Routine';
import AddTasks from '../../View/Dashboard/AddTasks';
import ModifyRewards from '../../View/Dashboard/ModifyRewards';
import ModifyGoals from '../../View/Dashboard/ModifyGoals';

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
            <HomeStack.Screen name="AddTasks" component={AddTasks} />
            <HomeStack.Screen name="ModifyRewards" component={ModifyRewards} />
            <HomeStack.Screen name="ModifyGoals" component={ModifyGoals} />
        </HomeStack.Navigator>
    );
}

export default OnboardingNavigator;