import { View, Text } from 'react-native'
import React from 'react'

// Components
import Section from '../../components/Dashboard/Section'
import RoutineButton from '../Routine/RoutineButton';

// Moment
import moment from 'moment';
import Moment from 'react-moment';

// Type
import type { NavigationProps } from '../../types/Props/NavigationProps';
import type { User } from '../../types/User'

type DailyRoutineProps = {
    user: User,
    navigation: NavigationProps['navigation'],
    route: NavigationProps['route']
}

const DailyRoutine = ({ user, navigation, route }: DailyRoutineProps) => {
    const currentTime = moment();
    const deadlineTime = typeof user?.routine?.deadline === 'string' ? user?.routine?.deadline : '00:00';
    const deadlineMoment = moment(deadlineTime, 'HH:mm'); // Parse the deadline string into a moment object
    
    let timeDiff = deadlineMoment.diff(currentTime);
    if (timeDiff < 0) {
        // If the deadline has passed, add 24 hours
        timeDiff += 24 * 60 * 60 * 1000;
    }

    const duration = moment.duration(timeDiff);
    const hoursLeft = Math.floor(duration.asHours());
    const minutesLeft = duration.minutes();

    const routineIsCompleted = user?.routine?.tasks?.every(task => task.completed);

    return (
        <Section
            title={
                <Moment style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 10,
                }} element={Text} format="dddd MMM DD">{new Date()}</Moment>
            }
        >
            {routineIsCompleted ?
                (
                    <Text
                        style={{
                            color: 'green',
                            fontSize: 16,
                            fontFamily: 'Roboto',
                            marginBottom: 10,
                        }}
                    >
                        {user?.streak > 1 ?
                            (
                                'You have completed your Daily Routine for ' + user?.streak + ' days in a row!'
                            )
                            :
                            (
                                'You have completed your Daily Routine!'
                            )}
                    </Text>
                )
                :
                (
                    <Text
                        style={{
                            color: hoursLeft > 2 ? 'black' : 'red',
                            fontSize: 16,
                            fontFamily: 'Roboto',
                            marginBottom: 10,
                        }}
                    >
                         {`${hoursLeft}:${minutesLeft.toString().padStart(2, '0')} left until your Daily Routine fails`}
                    </Text>
                )
            }
            <RoutineButton
                navigation={navigation}
                user={user}
            />
        </Section>
    )
}

export default DailyRoutine