import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Platform } from 'react-native';

// Components
import Button from '../../components/Misc/Button';
import ProgressBar from '../../components/Onboarding/ProgressBar';
import Input from '../../components/Misc/Input';
import ChipWithIcon from '../../components/Misc/ChipWithIcon';

// Image
import GoalDelay from '../../../assets/images/Onboarding/GoalDelay';
import Rewards from '../../../assets/images/Onboarding/Rewards';

// Redux
import { useDispatch } from 'react-redux';
import { useCreateRewardsMutation } from '../../redux/services/reward';
type RewardType = {
  reward: string,
  delay: Date,
}

export default function StepFour({ navigation }: any) {
  const [rewardGoal, setRewardGoal] = useState<string>('');
  const [delay, setDelay] = useState<Date>(new Date());
  const [rewards, setRewards] = useState<RewardType[]>([]);

  const dispatch = useDispatch();

  const [createRewards] = useCreateRewardsMutation();

  const handleStepFourCompletion = () => {
    const payloadStepFour = {
      rewards: rewards,
    }

    dispatch({
      type: 'onboarding/updateStepFourData',
      payloadStepFour
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
      console.log(err);
    })
    navigation.navigate('Onboarding', { screen: Platform.OS === 'ios' ? 'StepFiveIOS' : 'StepFiveAndroid' })
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
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View
            style={styles.header}
          >
            <ProgressBar
              current={3}
              total={4}
            />
            <Rewards />
            <Text style={styles.title}>Set your rewards.</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.introduction}>
              Choose your own rewards, don't hesitate: you have to motivate yourself !
            </Text>
            <View
              style={{
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: '10%',
                marginVertical: 20,
              }}
            >
              <View
                style={{
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  height: '100%',
                }}
              >
                <Input
                  keyboardType='default'
                  placeholder='Write your reward'
                  autoCapitalize='none'
                  value={rewardGoal}
                  onChange={setRewardGoal}
                />
              </View>
              <View
                style={{
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  height: '100%',
                }}
              >
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
              style={{
                paddingHorizontal: 50,
              }}
              onClick={handleRewardsCreation}>
              Add
            </Button>
          </View>
          <ScrollView
            style={{
              width: '100%',
              height: '25%',
              marginVertical: 10,
            }}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {rewards
              .map((reward, index) => {
                return (
                  <ChipWithIcon
                    key={index}
                    icon={GoalDelay}
                    title={reward.reward}
                    delay={reward.delay}
                  />
                )
              })
            }
          </ScrollView>
          <Button
            onClick={handleStepFourCompletion}
            disabled={rewards.length === 0}
            style={{
              width: '100%',
              marginBottom: 15,
            }}
          >
            Continue
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
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
  caption: {
    fontFamily: 'Roboto-Light',
    fontSize: 15,
    marginBottom: 20,
    opacity: 0.3,
    textTransform: 'uppercase',
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center',
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
});
