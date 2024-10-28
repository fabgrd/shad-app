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
    const [completedGoals, setCompletedGoals] = useState<Goal[]>([]);
    const [currentGoalIndex, setCurrentGoalIndex] = useState<number>(0);
    const [processedGoalIds, setProcessedGoalIds] = useState<Set<string>>(new Set());
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    
    useEffect(() => {
        refetch();
    }, [refetch]);
    
    useEffect(() => {
        if (completedGoals.length === 0) {
            const goalsWithZeroDays = goals.filter((goal: Goal) => {
                const now = moment();
                const objective = moment(goal.remainingDays);
                const days = objective.diff(now, "days");
                return days <= 0 && !processedGoalIds.has(goal._id);
            });

            if (goalsWithZeroDays.length > 0) {
                setCompletedGoals(goalsWithZeroDays);
                setCurrentGoalIndex(0);
                setIsModalVisible(true);
                console.log("___LOOP", goalsWithZeroDays.length, "new goals found");
            }
        }
    }, [goals, processedGoalIds]);

    const handleCloseModal = () => {
        const currentGoal = completedGoals[currentGoalIndex];
        setIsModalVisible(false);
        
        if (currentGoal) {
            setProcessedGoalIds(prev => new Set([...prev, currentGoal._id]));
        }

        if (currentGoalIndex < completedGoals.length - 1) {
            setTimeout(() => {
                setCurrentGoalIndex(prev => prev + 1);
                setIsModalVisible(true);
            }, 300);
        } else {
            setCompletedGoals([]);
            setCurrentGoalIndex(0);
        }
    };

    const currentCompletedGoal = completedGoals[currentGoalIndex];


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
            {currentCompletedGoal && (
                <CongratulationsModalForGoals
                    visible={isModalVisible}
                    onClose={handleCloseModal}
                    userName={user.name}
                    goalTitle={currentCompletedGoal.goal}
                    goalId={currentCompletedGoal._id}
                    goalCreatedAt={currentCompletedGoal.createdAt}
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
