import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

// Colors
import colors from '../../../styles/colors'

type CheatDayProps = {
  cheatDay: boolean,
  onPress: () => void,
}

const CheatDay = ({cheatDay, onPress} : CheatDayProps) => {
  const {LIGHT_GRAY, } = colors
  return (
    <TouchableOpacity
      style={{
        width: '80%',
        paddingVertical: 10,
        backgroundColor: cheatDay ? 'green' : LIGHT_GRAY,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      }}
      onPress={onPress}
      disabled={cheatDay}
    >
      <Text
        style={{
          fontSize: 16,
          color: 'white',
          fontFamily: 'Roboto-Bold',
        }}
      >🙈 Cheat Day</Text>
      <Text
        style={{
          fontSize: 15,
          color: 'white',
          fontFamily: 'Roboto',
        }}
      >
        {
          cheatDay ?
            'You can do whatever you want today !' :
            'Don\'t count this day on my score !'
        }
      </Text>
    </TouchableOpacity>
  )
}

export default CheatDay