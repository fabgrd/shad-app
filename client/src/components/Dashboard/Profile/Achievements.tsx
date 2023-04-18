import { View, Text } from 'react-native'
import React from 'react'

// Components
import AchievementsDisplay from './AchievementsDisplay'

// Type
import type { NavigationProps } from '../../../types/Props/NavigationProps'
import type { User } from '../../../types/User'

// Mock
import MOCK_ACHIEVEMENTS from "../../../MOCK/Dashboard/MOCK_ACHIEVEMENTS"

type AchievementsProps = {
  navigation: NavigationProps,
  user: User
}

const Achievements = (
  { navigation, user }: AchievementsProps
) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontFamily: 'Roboto-Bold',
          color: 'black',
          marginLeft: 10,
          marginBottom: 20,
        }}>Achievements</Text>
      <AchievementsDisplay navigation={navigation} achievements={MOCK_ACHIEVEMENTS} progression={user.achievements} />
    </View>
  )
}

export default Achievements