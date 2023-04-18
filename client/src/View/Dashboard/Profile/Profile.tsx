import { ScrollView, Text } from 'react-native'

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

// Types
import type { NavigationProps } from '../../../types/Props/NavigationProps'

// Components
import Header from '../../../components/Dashboard/Profile/Header'
import Achievements from '../../../components/Dashboard/Profile/Achievements'
import Statistics from '../../../components/Dashboard/Profile/Statistics'
import Calendar from '../../../components/Dashboard/Profile/Calendar'
import LogOutButton from '../../../components/Misc/LogOutButton'

// Redux
import { useSelector } from 'react-redux'

const Profile = (navigation: NavigationProps) => {
  const user = useSelector((state: any) => state.user.user)
  const tabBarHeight = useBottomTabBarHeight()

  console.log(user)
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
      <Achievements navigation={navigation} user={user} />
      <Calendar user={user} />
      <LogOutButton navigation={navigation.navigation} route={navigation.route} />
    </ScrollView>
  )
}

export default Profile