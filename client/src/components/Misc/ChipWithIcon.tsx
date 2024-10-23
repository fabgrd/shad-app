import React from 'react'
import Moment from 'react-moment'
import moment from 'moment'
import { View, Text, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type ChipWithIconProps = {
    icon: React.FunctionComponent
    title: string
    delay: Date
    onDelete?: () => void // Nouvelle prop pour la fonction de suppression
}

const ChipWithIcon = (
    {
        title,
        delay,
        icon: Icon,
        onDelete // Nouvelle prop
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
                justifyContent: 'space-between', // Ajouté pour espacer le contenu et l'icône de suppression
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            {onDelete && (
                <TouchableOpacity onPress={onDelete} style={{ padding: 5 }}>
                    <MaterialIcons
                        name="close"
                        size={24}
                        color="red"
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default ChipWithIcon
