import { View, Text } from 'react-native'
import React from 'react'

// Icons
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// MOCK DATA
import MOCK_LEAGUE from '../../../MOCK/Dashboard/MOCK_LEAGUE';

// Type
import type { User } from '../../../types/User';

type StatisticsBadgeProps = {
  Icon: React.ReactNode
  stat: number | string
  description: string
}

type StatisticsProps = {
  user: User
}

const StatisticsBadge = (
  {
    Icon,
    stat,
    description,
  }: StatisticsBadgeProps
) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'white',
          width: 150,
          borderRadius: 10,
          padding: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginRight: 10,
          borderWidth: 1,
          borderColor: 'black'
        }}
      >
        {Icon}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Roboto-Bold',
              color: 'black',
              marginLeft: 10,
            }}
          >{stat}</Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Roboto',
              color: 'black',
              marginLeft: 10,
            }}
          >{description}</Text>
        </View>
      </View>
    </View >
  )
}


const Statistics = ({ user }: StatisticsProps) => {
  const userLeague = MOCK_LEAGUE[user?.currentLeague]
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontFamily: 'Roboto-Bold',
          color: 'black',
          marginLeft: 10,
          marginBottom: 20,
        }}
      >
        Statistics
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <StatisticsBadge
          Icon={<MaterialIcons name="local-fire-department" size={24} color="black" />}
          stat={user?.streak}
          description="Day streak"
        />
        <StatisticsBadge
          Icon={<AntDesign name="star" size={24} color="black" />}
          stat={userLeague?.name}
          description="Current league"
        />
      </View>
    </View>
  )
}

export default Statistics