import { ScrollView, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

// Components
import Section from '../../components/Dashboard/Section'
import DailyRoutine from '../../components/Dashboard/DailyRoutine'
import RewardDelay from '../../../assets/images/Onboarding/RewardDelay'
import RewardsSummary from '../../components/Dashboard/RewardsSummary'
import GoalsSummary from '../../components/Dashboard/GoalsSummary'

// Type
import type { NavigationProps } from '../../types/Props/NavigationProps'

// Redux
import { useSelector } from 'react-redux'

const Home = (navigation : NavigationProps) => {
  const user = useSelector((state : any) => state.user.user)
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
      <DailyRoutine
        user={user}
        navigation={navigation.navigation}
        route={navigation.route}
      />
      <RewardsSummary/>
      <GoalsSummary/>
    </ScrollView>
  )
}

export default Home