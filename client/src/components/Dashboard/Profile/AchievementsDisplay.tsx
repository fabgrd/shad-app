import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

// Type
import type { Achievement } from '../../../types/Achievements'

// Components
import AchievementDescription from './AchievementDescription'
// Type
import type { NavigationProps } from '../../../types/Props/NavigationProps'

type AchievementsDisplayProps = {
    achievements: Achievement[]
    navigation: NavigationProps,
    progression: number[],
}

const AchievementsDisplay = (
    {
        achievements,
        navigation,
        progression
    }: AchievementsDisplayProps) => {
    return (
        <View
            style={{
                borderColor: 'black',
                backgroundColor: 'white',
                borderWidth: 1,
                borderRadius: 30,
                margin: 10,
                width: '90%',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
        >
            {achievements?.slice(0, 2)?.map((achievement, index) => {
                return (
                    <AchievementDescription
                        key={index}
                        achievement={achievement}
                        progress={progression[index]}
                    />
                )
            })}
            <TouchableOpacity
                style={{
                    borderColor: 'black',
                    borderTopWidth: 1,
                }}
                onPress={() => navigation.navigation.navigate('ProfileNavigator', { screen: 'Achievements', params: { achievements: achievements, progression: progression } })}
            >
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: 'Roboto-Bold',
                        color: 'black',
                        margin: 5,
                        textAlign: 'center',
                    }}
                >View more...</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AchievementsDisplay