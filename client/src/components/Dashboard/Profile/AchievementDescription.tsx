import { View, Text } from 'react-native'

// Components
import ProgressBar from '../../Onboarding/ProgressBar'

// Colors
import colors from '../../../styles/colors'

// Moment
import Moment from 'react-moment'

// Type
import type { Achievement } from '../../../types/Achievements'

// Icon
import {MaterialCommunityIcons} from '@expo/vector-icons'

const AchievementDescription = (
    {
        achievement,
        progress
    }: { achievement: Achievement, progress: number }
) => {
    progress === undefined ? progress = 0 : progress = progress
    const { GRAY, LIGHT_BLACK } = colors
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 5,
                width: '90%',
            }}
        >
            <MaterialCommunityIcons
                name={'trophy-award'}
                size={50}
                color={
                    progress === achievement.total ?
                    'gold': 
                    LIGHT_BLACK
                }
            />
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    margin: 5,
                    width: '70%',
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: 'Roboto-Bold',
                        color: 'black',
                        margin: 5,
                    }}
                >
                    {achievement.title}
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: 'Roboto',
                        color: 'black',
                        margin: 5,
                    }}
                >
                    {achievement.description}
                </Text>
                {progress === achievement.total ? (
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'Roboto-Bold',
                            color: 'green',
                            margin: 5,
                        }}
                    >
                        Completed on <Moment element={Text} format="ddd DD MMM">{achievement.completedDate as Date}</Moment>
                    </Text>
                ) : null}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: 5,
                        width: 150,
                        opacity: progress === achievement.total ? 0.2 : 1,
                    }}
                >
                    <ProgressBar
                        total={achievement.total}
                        current={progress}
                        offColor={GRAY}
                        onColor={LIGHT_BLACK}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'Roboto-Bold',
                            color: 'black',
                            margin: 5,
                        }}
                    >
                        {progress}/{achievement.total}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default AchievementDescription;