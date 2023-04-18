import React from 'react'
import Moment from 'react-moment'
import moment from 'moment'
import { View, Text, TouchableOpacity } from 'react-native'

type ChipWithIconProps = {
    icon: React.FunctionComponent
    title: string
    delay: Date
}

const ChipWithIcon = (
    {
        title,
        delay,
        icon: Icon,
    }
        : ChipWithIconProps) => {
    const now = moment();
    const objective = moment(delay, "YYYY-MM-DD");
    const days = objective.diff(now, "days");
    return (
        <View
            style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
            }}
        >
            {Icon && <Icon />}
            <Text
                style={{
                    fontSize: 16,
                    fontFamily: 'Roboto-Bold',
                    marginLeft: 10,
                }}
            >{days} days:</Text>
            <Text
                style={{
                    fontSize: 16,
                    fontFamily: 'Roboto',
                    marginLeft: 10,
                }}
            >{title}</Text>
        </View>
    )
}

export default ChipWithIcon