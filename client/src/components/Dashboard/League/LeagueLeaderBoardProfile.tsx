import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

// Type
import type { User } from '../../../types/User'
import type { NavigationProps } from '../../../types/Props/NavigationProps'

type LeagueLeaderBoardProfileProps = {
    user: User,
    position: number,
    navigation: NavigationProps
}

const LeagueLeaderBoardProfile = (
    { user, position, navigation }: LeagueLeaderBoardProfileProps) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: 100,
                backgroundColor: 'white',
                marginVertical: 5,
                borderRadius: 10,
                padding: 10
            }}
            onPress={() => navigation.navigation.navigate('LeagueNavigator', { screen: 'ProfileUser', params: { user: user } })}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: 100,
                    backgroundColor: 'white',
                    marginVertical: 5,
                    borderRadius: 10,
                    padding: 10
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: 'Roboto-Bold',
                        marginRight: 10
                    }}
                >{position}</Text>
                <Image
                    source={{ uri: user.photo ? user.photo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        borderColor: 'black',
                        borderWidth: 1,
                        marginLeft: 10
                    }}
                />
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: 'Roboto-Bold',
                        marginLeft: 10
                    }}

                >{user?.username}</Text>
            </View>
            <Text
                style={{
                    fontSize: 20,
                    fontFamily: 'Roboto',
                    marginRight: 10
                }}
            >{user?.leagueScore}pts</Text>
        </TouchableOpacity>
    )
}

export default LeagueLeaderBoardProfile