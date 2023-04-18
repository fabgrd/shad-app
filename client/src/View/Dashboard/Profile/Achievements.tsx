import { ScrollView, Text } from 'react-native'

// Components
import AchievementDescription from '../../../components/Dashboard/Profile/AchievementDescription'

// TabBarHeight
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

// Type
import type { Achievement } from '../../../types/Achievements'
import type { NavigationProps } from '../../../types/Props/NavigationProps'


type AchievementsProps = {
  navigation: NavigationProps['navigation'],
  route: NavigationProps['route']
}

const Achievements = ({ route }: AchievementsProps) => {
  const tabBarHeight = useBottomTabBarHeight()
  const { achievements, progression } = route.params;

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
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Roboto-Bold',
          color: 'black',
          margin: 5,
        }}
      >
        Achievements
      </Text>
      {(achievements as Achievement[])?.map((achievement: Achievement, index: number) => {
        return (
          <AchievementDescription
            key={index}
            achievement={achievement}
            progress={parseInt(progression)}
          />
        )
      })}
    </ScrollView>
  )
}

export default Achievements