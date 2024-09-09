import { View, Text, TouchableOpacity } from 'react-native'

// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Types
import type { NavigationProps } from '../../types/Props/NavigationProps'
import type { User } from '../../types/User'

type RoutineButtonProps = {
    navigation: NavigationProps['navigation']
    user: User
}

const RoutineButton = ({ navigation, user }: RoutineButtonProps) => {
    let completedTaskPercentage = user?.routine?.tasks?.filter(task => task.completed).length / user?.routine?.tasks?.length * 100

    completedTaskPercentage = user?.routine?.completed ? 100 : completedTaskPercentage

    // console.log('user.routine ', user.routine.completed)

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: completedTaskPercentage === 100 ? 'green' : '#fff',
                padding: 10,
                width: '100%',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'black',
                marginTop: 10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
            onPress={() => navigation.navigate('HomeNavigator', { screen: "DailyRoutine" })}
        >
            {
                completedTaskPercentage < 50
                    ? <MaterialCommunityIcons name="emoticon-sad-outline" size={35} color="black" />
                    : completedTaskPercentage < 100
                        ? <MaterialCommunityIcons name="emoticon-neutral-outline" size={35} color="black" />
                        : <MaterialCommunityIcons name="emoticon-happy-outline" size={35} color="white" />
            }
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginLeft: 10,
                }}
            >
                <Text
                    style={{
                        color: completedTaskPercentage === 100 ? '#fff' : 'black',
                        fontWeight: 'bold',
                    }}
                >Complete the Routine</Text>
                <Text
                    style={{
                        color: completedTaskPercentage === 100 ? '#fff' : 'black',
                    }}
                >{completedTaskPercentage}% completed</Text>
            </View>
        </TouchableOpacity>
    )
}

export default RoutineButton