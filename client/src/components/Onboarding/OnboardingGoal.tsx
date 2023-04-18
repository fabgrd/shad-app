import { View, Text } from 'react-native'
import React from 'react'

type OnboardingGoalsProps = {
    Image: React.FunctionComponent,
    goal: string,
    reverse?: boolean,
}

const OnboardingGoals = ({
    Image,
    goal,
    reverse = false,
}: OnboardingGoalsProps) => {
    return (
        <View
            style={{
                flexDirection: reverse ? 'row-reverse' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal:10,
            }}
        >
            <View
                style={{
                    width: 150,
                    height: 200,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
            <Image/>
            </View>
            <Text
                style={{
                    fontSize: 18,
                    flex: 1,
                    flexWrap: 'wrap',
                    marginLeft: reverse ? 0 : 10,
                    marginRight: reverse ? 10 : 0,
                }}
            >{goal}</Text>
        </View>
    )
}

export default OnboardingGoals