import { ScrollView, Text } from 'react-native'
import React from 'react'

// Components
import LeagueLeaderBoardProfile from './LeagueLeaderBoardProfile'

// MOCK_DATA
import MOCK_LEAGUE from '../../../MOCK/Dashboard/MOCK_LEAGUE'

// Redux
import { useSelector } from 'react-redux'

// Type
import type { NavigationProps } from '../../../types/Props/NavigationProps'

// TabBarHeight
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import Moment from 'react-moment'

const LeagueLeaderboard = (navigation: NavigationProps) => {
  const user = useSelector((state: any) => state.user.user)
  const { currentLeague } = user
  MOCK_LEAGUE[currentLeague].members[2] = user;
  let currentLeagueData = MOCK_LEAGUE[currentLeague];
  currentLeagueData?.members?.sort((a, b) => {
    return b.leagueScore - a.leagueScore
  })

  console.log(currentLeagueData.members)

  const tabBarHeight = useBottomTabBarHeight()

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
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: tabBarHeight + 50,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Roboto-Bold',
          fontWeight: 'bold',
          marginBottom: 10,
        }}
      >{currentLeagueData?.name} League</Text>
      <Text
        style={{
          fontSize: 15,
          fontFamily: 'Roboto-Bold',
          fontWeight: 'bold',
          marginBottom: 10,
        }}
      >Top 10 advance to the next league</Text>
      <Text
        style={{
          fontSize: 15,
          fontFamily: 'Roboto',
          marginBottom: 10,
        }}
      >Reset <Moment element={Text} fromNow>{currentLeagueData?.resetDate}</Moment></Text>
      {currentLeagueData?.members?.map((user, index) => {
        return (
          <LeagueLeaderBoardProfile navigation={navigation} position={index + 1} user={user} key={index} />
        )
      })
      }
    </ScrollView>
  )
}

export default LeagueLeaderboard