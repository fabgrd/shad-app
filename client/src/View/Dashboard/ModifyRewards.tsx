import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Platform, SafeAreaView } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

// Components
import Button from '../../components/Misc/Button';
import ProgressBar from '../../components/Onboarding/ProgressBar';
import Input from '../../components/Misc/Input';
import ChipWithIcon from '../../components/Misc/ChipWithIcon';

// Image
import GoalDelay from '../../../assets/images/Onboarding/GoalDelay';
import Rewards from '../../../assets/images/Onboarding/Rewards';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { useCreateRewardsMutation } from '../../redux/services/reward';
import { actions } from '../../redux/features/user/userSlice';

// Types 
import type { Reward } from '../../types/Reward';
type RewardType = {
  reward: string,
  delay: Date,
}

export default function ModifyRewards({ navigation }: any) {
  const [rewardGoal, setRewardGoal] = useState<string>('');
  const [delay, setDelay] = useState<Date>(new Date());
  const [rewards, setRewards] = useState<RewardType[]>([]);
  const existingRewards = useSelector((state: any) => state.user.user.rewards) || [];
  const tabBarHeight = useBottomTabBarHeight()

  const dispatch = useDispatch();

  const [createRewards] = useCreateRewardsMutation();

  const handleModifyRewardsCompletion = () => {
    const payloadModifyRewards = {
      rewards: rewards,
    }

    dispatch({
      type: 'dashboard/updateModifyRewardsData',
      payloadModifyRewards
    })

    const payload: any = []

    rewards.forEach((reward) => {
      payload.push({
        "remainingDays": reward.delay,
        "title": reward.reward,
      })
    })

    createRewards({
      rewards: payload
    }).unwrap().then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log('Error while creating rewards', err);
    })
    navigation.navigate('Home')
  }

  const handleRewardsCreation = () => {
    if (rewardGoal === '') {
      return;
    }
    const newReward = {
      reward: rewardGoal,
      delay: delay,
    }

    setRewards([...rewards, newReward]);
    setDelay(new Date());
    setRewardGoal('');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#fff',
              paddingTop: 20,
              paddingHorizontal: 5,
            }}
            contentContainerStyle={{
              flexGrow: 1,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              paddingBottom: tabBarHeight + 50,
            }}
          >
            <View style={styles.container}>
              <View style={styles.header}>
                <Rewards />
                <Text style={styles.title}>Modify your rewards</Text>
              </View>
              <View style={styles.formContainer}>
                <View style={styles.inputRow}>
                  <View style={styles.inputWrapper}>
                    <Input
                      keyboardType='default'
                      placeholder='Write your reward'
                      autoCapitalize='none'
                      value={rewardGoal}
                      onChange={setRewardGoal}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Input
                      keyboardType='default'
                      placeholder='Delay'
                      date
                      autoCapitalize='none'
                      value={delay}
                      onChange={setDelay}
                    />
                  </View>
                </View>
                <Button
                  style={styles.addButton}
                  onClick={handleRewardsCreation}
                  icon="add"
                >
                  Add
                </Button>
              </View>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
              >
                {existingRewards && existingRewards.map((reward: Reward, index: number) => (
                  <ChipWithIcon
                    key={index}
                    icon={GoalDelay}
                    title={reward.title}
                    delay={new Date(reward.remainingDays)}
                  />
                ))}
                {rewards.map((reward, index) => (
                  <ChipWithIcon
                    key={`new-${index}`}
                    icon={GoalDelay}
                    title={reward.reward}
                    delay={reward.delay}
                  />
                ))}
              </ScrollView>
              <Button
                onClick={handleModifyRewardsCompletion}
                style={styles.continueButton}
              >
                Continue
              </Button>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  addButton: {
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#6200EE',
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scrollView: {
    flex: 1,
    marginVertical: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  continueButton: {
    width: '100%',
    marginTop: 10,
    marginBottom: 15,
  },
});
