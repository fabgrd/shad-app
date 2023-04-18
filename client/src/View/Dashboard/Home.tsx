import { ScrollView, Text, StyleSheet } from 'react-native'
import React from 'react'

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
  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 5,
      }}
      contentContainerStyle={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
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