import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

// Components
import Button from '../../components/Misc/Button';
import ProgressBar from '../../components/Onboarding/ProgressBar';
import Input from '../../components/Misc/Input';
import ChipWithIcon from '../../components/Misc/ChipWithIcon';

// Image
import GoalDelay from '../../../assets/images/Onboarding/GoalDelay';

// Redux
import { useCreateRewardsMutation } from '../../redux/services/reward';
import type { Reward } from '../../types/Reward';

export default function ModifyRewards({ navigation }: any) {
  const [rewardGoal, setRewardGoal] = useState<string>('');
  const [delay, setDelay] = useState<Date>(new Date());
  const dispatch = useDispatch();
  const rewards = useSelector((state: any) => state.user.user.rewards);

  const handleRewardsCreation = () => {
    if (rewardGoal === '') {
      return;
    }

    // Check if the reward already exists
    const existingRewardTitles = rewards.map((reward: Reward) => reward.title);
    if (existingRewardTitles.includes(rewardGoal)) {
      console.log('Reward already exists');
      return;
    }

    // Create a new reward
    const newReward: Reward = {
      title: rewardGoal,
      remainingDays: moment(delay).diff(moment(), 'days'),
      // Add any other required properties of Reward type here
    };

    // Dispatch action to add the new reward
    dispatch({
      type: 'rewards/addReward',
      payload: newReward
    });

    // Reset input fields
    setDelay(new Date());
    setRewardGoal('');
  }

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <ProgressBar current={3} total={4} />
            <Text style={styles.title}>Modify your rewards.</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.introduction}>
              Update your rewards to stay motivated!
            </Text>
            <View style={styles.inputContainer}>
              <Input
                keyboardType='default'
                placeholder='Write your reward'
                autoCapitalize='none'
                value={rewardGoal}
                onChange={setRewardGoal}
              />
              <Input
                keyboardType='default'
                placeholder='Delay'
                date
                autoCapitalize='none'
                value={delay}
                onChange={setDelay}
              />
            </View>
            <Button
              style={styles.addButton}
              onClick={handleRewardsCreation}>
              Add
            </Button>
          </View>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
            {rewards.map((reward: Reward, index: number) => (
              <ChipWithIcon
                key={index}
                icon={GoalDelay}
                title={reward.title}
                delay={new Date(reward.remainingDays)}
              />
            ))}
          </ScrollView>
          <Button
            onClick={() => navigation.navigate('Dashboard')}
            style={styles.continueButton}
          >
            Continue
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '33%',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    height: '30%',
  },
  introduction: {
    fontFamily: 'Roboto-Light',
    fontSize: 15,
    textAlign: 'left',
    marginVertical: 20,
  },
  inputContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: '10%',
    marginVertical: 20,
  },
  addButton: {
    paddingHorizontal: 50,
  },
  scrollView: {
    width: '100%',
    height: '25%',
    marginVertical: 10,
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButton: {
    width: '100%',
    marginBottom: 15,
  },
});
