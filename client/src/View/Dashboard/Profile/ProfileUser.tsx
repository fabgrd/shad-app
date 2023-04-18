import { ScrollView } from 'react-native'
import React from 'react'

// Components
import Header from '../../../components/Dashboard/Profile/Header'
import Achievements from '../../../components/Dashboard/Profile/Achievements'

// Type
import type { NavigationProps } from '../../../types/Props/NavigationProps'
import Statistics from '../../../components/Dashboard/Profile/Statistics'

// TabBar
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const ProfileUser = (navigation : NavigationProps) => {
    const { user } = navigation.route.params;

    const tabBarHeight = useBottomTabBarHeight()

    return (
        <ScrollView
            style={{
                flex: 1,
                width: '100%',
                backgroundColor: '#fff',
                paddingTop: 20,
                paddingHorizontal: 5,
            }}
            contentContainerStyle={{
                flexGrow: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingBottom: tabBarHeight + 50,
            }}
        >
            <Header user={user} />
            <Statistics user={user} />
            <Achievements user={user} navigation={navigation} />
        </ScrollView>
    )
}

export default ProfileUser