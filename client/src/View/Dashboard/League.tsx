import { View, Text } from 'react-native'
import React from 'react'

// Type
import type { NavigationProps } from '../../types/Props/NavigationProps'

// Components
import LeagueLeaderboard from '../../components/Dashboard/League/LeagueLeaderboard'

const League = ({navigation, route}: NavigationProps) => {
  return (
    <View>
      <LeagueLeaderboard
        route={route}
        navigation={navigation}
      />
    </View>
  )
}

export default League