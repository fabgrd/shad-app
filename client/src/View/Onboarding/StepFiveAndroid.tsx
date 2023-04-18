import { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

// Components
import Button from '../../components/Misc/Button';
import Input from '../../components/Misc/Input';
import ProgressBar from '../../components/Onboarding/ProgressBar';
import ChipWithIcon from '../../components/Misc/ChipWithIcon';

// Image
import Rewards from '../../../assets/images/Onboarding/Rewards';
import RewardDelay from '../../../assets/images/Onboarding/RewardDelay';

// Redux
import { useDispatch } from 'react-redux';
import { useCreateGoalMutation } from '../../redux/services/goal';
import { useGetUserMutation } from '../../redux/services/auth';

type GoalType = {
  goal: string,
  delay: Date,
}

export default function StepFive({ navigation }: any) {
  const [goal, setGoal] = useState<string>('');
  const [delay, setDelay] = useState<Date>(new Date());
  const [goals, setGoals] = useState<GoalType[]>([]);

  const dispatch = useDispatch();

  const [createGoal] = useCreateGoalMutation();
  const [getUser] = useGetUserMutation();

  const handleStepFiveCompletion = () => {
    const payloadStepFive = {
      goals: goals,
    }
    dispatch({
      type: 'onboarding/updateStepFiveData',
      payload: payloadStepFive
    })

    createGoal({
      goals: goals,
    }).unwrap().then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
    getUser({})
      .unwrap()
      .then((res) => {
        console.log(res);
        dispatch({
          type: 'user/setIsLogged',
          payload: true
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleGoalsCreation = () => {
    if (goal === '') {
      return;
    }
    const newGoal = {
      goal: goal,
      delay: delay,
    }

    setGoals([...goals, newGoal]);
    setDelay(new Date());
    setGoal('');
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
            <Text style={styles.title}>Set your goals.</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.introduction}>
              Advice : choose short, medium and long term goals.
              You can change them as many times as you like.
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
                  value={goal}
                  onChange={setGoal}
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
                  // date
                  autoCapitalize='none'
                  value={delay}
                  onChange={setDelay}
                />
              </View>
            </View>
            <Button
              onClick={handleGoalsCreation}>
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
            {goals
              ?.map((goal, index) => {
                return (
                  <ChipWithIcon
                    key={index}
                    icon={RewardDelay}
                    title={goal.goal}
                    delay={goal.delay}
                  />
                )
              })
            }
          </ScrollView>
          <Button
            onClick={handleStepFiveCompletion}
            style={{
              width: '100%',
              marginBottom: 15,
            }}
            disabled={goals.length === 0}
          >
            Transform my life experience
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
