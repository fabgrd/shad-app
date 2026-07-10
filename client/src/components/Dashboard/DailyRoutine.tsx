import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

// Components
import Section from '../../components/Dashboard/Section'
import RoutineButton from '../Routine/RoutineButton';

// Moment
import moment from 'moment';
import Moment from 'react-moment';

// Type
import type { NavigationProps } from '../../types/Props/NavigationProps';
import type { User } from '../../types/User'

import { useGetRoutineQuery } from '../../redux/services/routine';

type DailyRoutineProps = {
    user: User,
    navigation: NavigationProps['navigation'],
    route: NavigationProps['route']
}

const DailyRoutine = ({ user, navigation, route }: DailyRoutineProps) => {
    const [currentTime, setCurrentTime] = useState(moment());
    const [deadlineTime, setDeadlineTime] = useState(typeof user?.routine?.deadline === 'string' ? user?.routine?.deadline : '00:00');
    const [timeDiff, setTimeDiff] = useState(0);
    const [hoursLeft, setHoursLeft] = useState(0);
    const [minutesLeft, setMinutesLeft] = useState(0);
    const [routineIsCompleted, setRoutineIsCompleted] = useState(user?.routine?.tasks?.every(task => task.completed));

    const { refetch } = useGetRoutineQuery(undefined, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("---------REFETCH DANS DAILY ROUTINE");
            refetch();
            setCurrentTime(moment());
            const deadlineMoment = moment(deadlineTime, 'HH:mm');
            let diff = deadlineMoment.diff(currentTime);
            if (diff < 0) {
                diff += 24 * 60 * 60 * 1000;
            }
            setTimeDiff(diff);
            const duration = moment.duration(diff);
            setHoursLeft(Math.floor(duration.asHours()));
            setMinutesLeft(duration.minutes());
            setRoutineIsCompleted(user?.routine?.tasks?.every(task => task.completed));
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, [refetch, user, deadlineTime]);

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