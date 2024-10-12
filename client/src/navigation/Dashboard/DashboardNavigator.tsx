import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native';

// Colors
import Colors from '../../styles/colors';

// Home Navigator
import HomeNavigator from './HomeNavigator';

// Profile Navigator
import ProfileNavigator from './ProfileNavigator';

// League Navigator
import LeagueNavigator from './LeagueNavigator';

// Redux
import { useSelector } from 'react-redux';

const DashboardTab = createBottomTabNavigator();

function DashboardNavigator() {
  const user = useSelector((state: any) => state.user.user);
  const { LIGHT_BLUE, LIGHTER_BLUE } = Colors;
  return (
    <DashboardTab.Navigator
      initialRouteName="HomeNavigator"
      screenOptions={{
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: LIGHT_BLUE,
        tabBarStyle: ({
          position: 'absolute',
          borderWidth: 1,
          borderTopWidth: 1,
          borderTopColor: 'black',
          marginBottom: 30,
          marginHorizontal: 30,
          borderRadius: 20,
          paddingBottom: 0,
          height: 50,
        }),
        headerStyle: {
          backgroundColor: LIGHTER_BLUE,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,

          height: 100,
        },
        headerTitleStyle: {
          fontSize: 18, // Adjust this value to change the text size
        },
        headerTitle: () => (
          <Text>
            <Text style={{ fontSize: 24 }}>Hi,</Text> {user?.name || 'Undefined guest'}
          </Text>
        ),
      }}
    >
      <DashboardTab.Screen name="LeagueNavigator" component={LeagueNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="trophy" color={color} size={size} />
          ),
        }}
      />
      <DashboardTab.Screen name="HomeNavigator" component={HomeNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <DashboardTab.Screen
        name="ProfileNavigator" component={ProfileNavigator}
        options={{
          tabBarShowLabel: false,
          headerTitle: `Hi, ${user?.name || 'Undefined guest'}`,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </DashboardTab.Navigator>
  );
}

export default DashboardNavigator;