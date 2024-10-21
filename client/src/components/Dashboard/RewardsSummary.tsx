import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Components
import Section from './Section';
import Button from '../Misc/Button';
import { NavigationProps } from '../../types/Props/NavigationProps';

// Colors
import Colors from '../../styles/colors';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { useGetRewardsQuery } from '../../redux/services/reward';

// Type
import type { Reward } from '../../types/Reward';

// Moment
import moment from 'moment';

const RewardsSummary = () => {
    const navigation = useNavigation<NavigationProps['navigation']>();
    const dispatch = useDispatch();
    const { BLUE } = Colors;
    const { refetch } = useGetRewardsQuery(undefined, {
        refetchOnReconnect: true,
        // refetchOnWindowFocus: true,
        refetchOnMountOrArgChange: true,
      });
      useFocusEffect(
        React.useCallback(() => {
            console.log("Refetching rewards...");
            refetch();
        }, [refetch])
    );
    

    const rewards = useSelector((state: any) => state.user.user.rewards) || [];

    return (
        <Section title="Rewards">
            <View style={styles.rewardsContainer}>
                {rewards && rewards.length > 0 ? (
                    rewards.map((reward: Reward, index: number) => {
                        const now = moment();
                        const objective = moment(reward.remainingDays);
                        const days = objective.diff(now, "days");
                        return (
                            <View key={index} style={styles.rewardItem}>
                                <MaterialCommunityIcons name="trophy" size={24} color={BLUE} style={styles.icon} />
                                <Text style={styles.rewardText}>
                                    In <Text style={styles.daysText}>{days}</Text> days : 
                                    <Text style={styles.titleText}> {reward.title}</Text>
                                </Text>
                            </View>
                        );
                    })
                ) : (
                    <Text>No rewards available</Text>
                )}
            </View>
            <Button
                primary={false}
                style={styles.modifyButton}
                onClick={() => navigation.navigate('ModifyRewards', { screen: 'ModifyRewards' })}
            >
                Modify rewards
            </Button>
        </Section>
    );
};

const styles = StyleSheet.create({
    rewardsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 10,
        width: '100%'
    },
    rewardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    icon: {
        marginRight: 5
    },
    rewardText: {
        fontFamily: 'Roboto-Bold',
    },
    daysText: {
        color: Colors.BLUE,
    },
    titleText: {
        fontFamily: 'Roboto-Light'
    },
    modifyButton: {
        // Ajoutez ici les styles pour le bouton "Modify rewards"
    }
});

export default RewardsSummary;
