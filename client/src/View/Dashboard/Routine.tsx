import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, View } from 'react-native'

// Hooks
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

// Components
import CheatDay from '../../components/Dashboard/Routine/CheatDay'
import CheckList from '../../components/Dashboard/Routine/CheckList'
import Comment from '../../components/Dashboard/Routine/Comment'
import FeelingRating from '../../components/Dashboard/Routine/FeelingRating'

// Redux
import { useSelector } from 'react-redux'
import { useCheatDayMutation } from '../../redux/services/routine'

const Routine = () => {
  const tabBarHeight = useBottomTabBarHeight()

  const user = useSelector((state: any) => state?.user?.user)

  const [cheatDay] = useCheatDayMutation()

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <CheckList
            taskList={user?.routine?.tasks}
          />
          <FeelingRating />
          <Comment />
          <CheatDay
            cheatDay={user?.routine?.cheatDay}
            onPress={() => {
              cheatDay({})
            }}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}

export default Routine