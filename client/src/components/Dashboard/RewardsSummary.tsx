import { View, Text } from 'react-native'
import React from 'react'

// Components
import Section from './Section'

// Colors
import Colors from '../../styles/colors'

// Redux
import { useSelector } from 'react-redux'

// Type
import type { Reward } from '../../types/Reward'

// MOCK_DATA
import MOCK_REWARD from '../../MOCK/Dashboard/MOCK_REWARDS'

// Moment
import moment from 'moment';

const RewardsSummary = () => {
    const { BLUE } = Colors;
    const rewards = useSelector((state: any) => state.user.user.rewards);
    const now = moment();
    return (
        <Section
            title="Rewards"
        >
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginTop: 10,
                    width: '100%'
                }}
            >
                {((rewards as Reward[])?.length > 0 ? (rewards as Reward[]) : (MOCK_REWARD as Reward[]))?.map((reward: Reward, index: number) => {
                    const objective = moment(reward.remainingDays, "YYYY-MM-DD");
                    const days = objective.diff(now, "days");
                    return (
                        <Text key={index}
                            style={{
                                marginBottom: 10,
                                fontFamily: 'Roboto-Bold'
                            }}
                        >
                            In{" "}
                            <Text
                                style={{
                                    color: BLUE,
                                }}
                            >{days}</Text>
                            {" "}days :{" "}
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Light'
                                }}
                            >{reward?.title}</Text>
                        </Text>
                    )
                })}
            </View>
        </Section>
    )
}

export default RewardsSummary