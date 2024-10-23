import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Components
import Button from '../../components/Misc/Button';
import ProgressBar from '../../components/Onboarding/ProgressBar';
import Input from '../../components/Misc/Input';
import ChipWithIcon from '../../components/Misc/ChipWithIcon';

// Image
import GoalDelay from '../../../assets/images/Onboarding/GoalDelay';
import Goals from '../../../assets/images/Onboarding/Rewards';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { useCreateGoalsMutation, useGetGoalsQuery, useDeleteGoalsMutation } from '../../redux/services/goal';

// Types 
import type { Goal } from '../../types/Goal';
type GoalType = {
  goal: string,
  delay: Date,
}

// Add this type definition
type GoalWithId = Goal & { _id: string };

export default function ModifyGoals({ navigation }: any) {
  const [goalTitle, setGoalTitle] = useState<string>('');
  const [delay, setDelay] = useState<Date>(new Date());
  const [goals, setGoals] = useState<GoalType[]>([]);
  const existingGoals = useSelector((state: any) => state.user.user.goals) || [] as GoalWithId[];
  const tabBarHeight = useBottomTabBarHeight();

  const dispatch = useDispatch();

  const [createGoals] = useCreateGoalsMutation();
  const [deleteGoals] = useDeleteGoalsMutation();

  const handleModifyGoalsCompletion = () => {
    const payloadModifyGoals = {
      goals: goals,
    };

    dispatch({
      type: 'dashboard/updateModifyGoalsData',
      payloadModifyGoals
    });

    const payload: any = [];

    goals.forEach((goal) => {
      payload.push({
        "remainingDays": goal.delay,
        "goal": goal.goal,
      });
    });

    createGoals({
      goals: payload
    }).unwrap().then((res) => {
    }).catch((err) => {
      console.error('Error while creating goals', err);
    });
    navigation.navigate('Home');
  };

  const handleGoalsCreation = () => {
    if (goalTitle === '') {
      return;
    }
    const newGoal = {
      goal: goalTitle,
      delay: delay,
    };

    setGoals([...goals, newGoal]);
    setDelay(new Date());
    setGoalTitle('');
  };

  const handleDeleteGoal = (goalId: string) => {
    deleteGoals({ goalsToRemove: [goalId] })
      .unwrap()
      .then((res) => {
        console.log('Goal deleted:', res);
        // You may want to update local state or refetch goals here
      })
      .catch((err) => {
        console.error('Error while deleting goal', err);
      });
  };

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
                <Goals />
                <Text style={styles.title}>Modify your goals</Text>
              </View>
              <View style={styles.formContainer}>
                <View style={styles.inputRow}>
                  <View style={styles.inputWrapper}>
                    <Input
                      keyboardType='default'
                      placeholder='Write your goal'
                      autoCapitalize='none'
                      value={goalTitle}
                      onChange={setGoalTitle}
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
                  onClick={handleGoalsCreation}
                  icon="add"
                >
                  Add
                </Button>
              </View>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
              >
                {existingGoals && existingGoals.map((goal: GoalWithId, index: number) => (
                  <View key={index} style={styles.goalItem}>
                    <ChipWithIcon
                      icon={GoalDelay}
                      title={goal.goal}
                      delay={new Date(goal.remainingDays)}
                      onDelete={() => handleDeleteGoal(goal._id)}
                    />
                  </View>
                ))}
                {goals.map((goal, index) => (
                  <View key={`new-${index}`} style={styles.goalItem}>
                    <ChipWithIcon
                      icon={GoalDelay}
                      title={goal.goal}
                      delay={goal.delay}
                      onDelete={() => setGoals(goals.filter((_, i) => i !== index))}
                    />
                  </View>
                ))}
              </ScrollView>
              <Button
                onClick={handleModifyGoalsCompletion}
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
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    marginLeft: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
