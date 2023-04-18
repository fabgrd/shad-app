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
    const currentDate = moment();
    const futureDate = moment(user?.routine?.deadline);

    const duration = moment.duration(futureDate.diff(currentDate));
    const hoursLeft = Math.round(duration.asHours());
    const minutesLeft = duration.minutes();

    const routineIsCompleted = user?.routine?.tasks?.every(task => task.completed);

    return (
        <Section
            title={
                <Moment style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 10,
                }} element={Text} format="dddd">{new Date()}</Moment>
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
                        {hoursLeft + ':' + minutesLeft + 'h left until your Daily Routine fail'}
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