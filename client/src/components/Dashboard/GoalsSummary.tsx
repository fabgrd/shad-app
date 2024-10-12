import { View, Text } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import de l'icône

// Components
import Section from './Section';

// Type
import type { Goal } from '../../types/Goal';

// MOCK_DATA
import MOCK_GOALS from '../../MOCK/Dashboard/MOCK_GOALS';

// Redux
import { useSelector } from 'react-redux';

// Moment
import moment from 'moment';

const GoalsSummary = () => {
    const goals = useSelector((state: any) => state.user.user.goals);
    const now = moment();

    return (
        <Section
        title="Goals"
        >
        <MaterialCommunityIcons name="flag" size={24} color="green" style={{ marginRight: 5 }} />
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginTop: 10,
                    width: '100%'
                }}
            >
                {((goals as Goal[])?.length ? (goals as Goal[]) : MOCK_GOALS)?.map((goal: Goal, index: number) => {
                    const objective = moment(goal?.delay, "YYYY-MM-DD");
                    const days = objective.diff(now, "days");
                    return (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            {/* Ajout de l'icône de drapeau */}
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Bold',
                                }}
                            >
                                {
                                    days <= 1
                                        ? 'Of the day'
                                        : days <= 7
                                            ? 'Of the week'
                                            : 'Long-term'
                                }
                                {" : "}
                                <Text
                                    style={{
                                        fontFamily: 'Roboto-Light'
                                    }}
                                >{goal?.goal}</Text>
                            </Text>
                        </View>
                    );
                })}
            </View>
        </Section>
    );
};

export default GoalsSummary;
