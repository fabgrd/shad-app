import { View, Text, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CongratulationsModalForGoals from '../../View/Dashboard/CongratulationsModalForGoals';

// Components
import Section from './Section';
import Button from '../Misc/Button';
import { NavigationProps } from '../../types/Props/NavigationProps';

// Colors
import Colors from '../../styles/colors';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { useGetGoalsQuery } from '../../redux/services/goal';

// Type
import type { Goal } from '../../types/Goal';

// Moment
import moment from 'moment';

const GoalsSummary = () => {
    const navigation = useNavigation<NavigationProps['navigation']>();
    const dispatch = useDispatch();
    const { LIGHTER_BLUE } = Colors;
    const { refetch } = useGetGoalsQuery(undefined, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
    });
    const user = useSelector((state: any) => state?.user?.user);
    const goals = user?.goals || [];
    const [completedGoal, setCompletedGoal] = useState<Goal | null>(null);

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        const goalWithZeroDays = goals.find((goal: Goal) => {
            const now = moment();
            const objective = moment(goal.remainingDays);
            const days = objective.diff(now, "days");
            return days <= 0;
        });

        if (goalWithZeroDays) {
            setCompletedGoal(goalWithZeroDays);
        }
    }, [goals]);

    const handleCloseModal = () => {
        setCompletedGoal(null);
    };

    return (
        <Section title="Goals">
            <View style={styles.goalsContainer}>
                {goals && goals.length > 0 ? (
                    goals.map((goal: Goal, index: number) => {
                        const now = moment();
                        const objective = moment(goal.remainingDays);
                        const days = objective.diff(now, "days");
                        return (
                            <View key={index} style={styles.goalItem}>
                                <MaterialCommunityIcons name="flag" size={24} color={LIGHTER_BLUE} style={styles.icon} />
                                <Text style={styles.goalText}>
                                    In <Text style={styles.daysText}>{days}</Text> days : 
                                    <Text style={styles.titleText}> {goal.goal}</Text>
                                </Text>
                            </View>
                        );
                    })
                ) : (
                    <Text>No goals available</Text>
                )}
            </View>
            <Button
                primary={false}
                style={styles.modifyButton}
                onClick={() => navigation.navigate('ModifyGoals', { screen: 'ModifyGoals' })}
            >
                Modify goals
            </Button>
            {completedGoal && (
                <CongratulationsModalForGoals
                    visible={!!completedGoal}
                    onClose={handleCloseModal}
                    userName={user.name}
                    goalTitle={completedGoal.goal}
                    goalId={completedGoal._id}
                    goalCreatedAt={completedGoal.createdAt}
                />
            )}
        </Section>
    );
};

const styles = StyleSheet.create({
    goalsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 10,
        width: '100%'
    },
    goalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    icon: {
        marginRight: 5
    },
    goalText: {
        fontFamily: 'Roboto-Bold',
    },
    daysText: {
        color: Colors.LIGHTER_BLUE,
    },
    titleText: {
        fontFamily: 'Roboto-Light'
    },
    modifyButton: {
        // Add styles for the "Modify goals" button here
    }
});

export default GoalsSummary;
