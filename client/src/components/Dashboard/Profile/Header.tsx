import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

// Moment
import Moment from 'react-moment'

// Colors
import colors from '../../../styles/colors'

// Icon
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';
import { User } from '../../../types/User'

type HeaderButtonProps = {
  Icon?: React.ReactNode
  text?: string
}

type HeaderProps = {
  user: User
}

const HeaderButton = ({
  Icon,
  text,
}: HeaderButtonProps) => {
  const { LIGHT_BLUE } = colors
  return (
    <TouchableOpacity
      style={{
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: LIGHT_BLUE,
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
      }}
    >
      {Icon && Icon}
      {text && <Text
        style={{
          fontSize: 16,
          fontFamily: 'Roboto',
          color: 'white',
        }}
      >{text}</Text>}
    </TouchableOpacity>
  )
}

const Header = (
  {
    user,
  }: HeaderProps
) => {
  const { LIGHT_BLUE } = colors

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
        width: '100%',
      }}
    >
      {/* Photo & infos */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Roboto-Bold',
            }}>{user.name}</Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Roboto',
            }}
          >{user.pseudo}</Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Roboto-Light',
            }}
          >
            Joined on{' '}
            <Moment element={Text} format="ddd DD MMM">{user.createdAt}</Moment>
          </Text>
        </View>
        <Image
          source={{ uri: user.photo ? user.photo : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <View>
        </View>
      </View>
      {/* Followers & following */}
      <View
        style={{
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Roboto-Bold',
            marginRight: 20,
            color: LIGHT_BLUE,
          }}
        >
          {(user.followers as string[])?.length ? (user.followers as string[])?.length : 0} followers
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Roboto-Bold',
            color: LIGHT_BLUE,
          }}
        >
          {(user.following as string[])?.length ? (user.following as string[])?.length : 0} following
        </Text>
      </View>
      {/* Add & share & settings */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <HeaderButton
            text='Add friends'
          />
          <HeaderButton
            Icon={<MaterialCommunityIcons name="share" size={24} color="white" />}
          />
        </View>
        <View>
          <FontAwesome name="gear" size={35} color="black" />
        </View>
      </View>
    </View>
  )
}

export default Header