import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../components/Misc/Button';
import ChipSelector from '../../components/Onboarding/ChipSelector';
import Input from '../../components/Misc/Input';
import { useDispatch, useSelector } from 'react-redux';
import { useAddTasksMutation, useRemoveTasksMutation, useGetRoutineQuery, useUpdateRoutineMutation } from '../../redux/services/routine';
import moment from 'moment';

interface Task {
  _id: string;
  title: string;
  score: number;
  completed: boolean;
}

export default function AddTasks({ navigation }: any) {
  const [chipList, setChipList] = useState<string[]>([]);
  const [deadline, setDeadline] = useState<Date>(new Date());
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.user?.user);

  const [addTask] = useAddTasksMutation();
  const [removeTask] = useRemoveTasksMutation();
  const [updateRoutine] = useUpdateRoutineMutation();
  const { data: routine, isLoading } = useGetRoutineQuery(user?.routine?.tasks);

  useEffect(() => {
    if (routine && !isLoading) {
      const existingTasks = user?.routine?.tasks.map((task: Task) => task.title);
      setChipList(existingTasks);

      if (user?.routine?.deadline) {
        setDeadline(new Date(user.routine.deadline));
      }
    }
  }, [routine, isLoading]);

  const handleAddTasksCompletion = async () => {
    const existingTaskTitles = user?.routine?.tasks.map((task: Task) => task.title);
    const newTasks = chipList.filter(taskTitle => !existingTaskTitles.includes(taskTitle));
    const tasksToAdd = newTasks.map(task => ({
      title: task,
      score: 10,
      completed: false,
    }));
    const oldTasks = existingTaskTitles.filter((taskTitle: string) => !chipList.includes(taskTitle));
    const tasksToRemove = user?.routine?.tasks
      .filter((task: Task) => oldTasks.includes(task.title))
      .map((task: Task) => task._id);

    if (tasksToAdd.length > 0) {
      addTask({ tasksToAdd })
        .unwrap()
        .then(res => {
          dispatch({
            type: 'user/updateTasks',
            payload: tasksToAdd,
          });
        })
        .catch(err => {
          console.log('Error adding tasks:', err);
        });
    }

    if (tasksToRemove.length > 0) {
      removeTask({ tasksToRemove })
        .unwrap()
        .then(res => {
          dispatch({
            type: 'user/updateTasks',
            payload: tasksToRemove,
          });
        })
        .catch(err => {
          console.log('Error removing tasks:', err);
        });
    }

    // Update routine deadline
    if (deadline) {

      console.log(JSON.stringify(user, null, 4))
      const updatedRoutine = {
        routine: user.routine,
        deadline: deadline,
        updateUser: user
      };
    
      updateRoutine({ deadline })
        .unwrap()
        .then(res => {
          dispatch({
            type: 'user/updateRoutine',
            payload: updatedRoutine,
          });
         
        })
        .catch(err => {
          console.log('Error updating routine:', err);
        });
    }

    navigation.navigate('HomeNavigator', { screen: 'DailyRoutine' });
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Modify your routine</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.content}>
              <ChipSelector
                chipList={chipList}
                setChipList={setChipList}
                placeholder="Write your own activity"
              />
              <View style={styles.timeSelector}>
                <MaterialCommunityIcons name="clock-outline" size={50} />
                <View>
                  <Text style={{ fontWeight: 'bold' }}>Routine Deadline</Text>
                  <Text>To complete before...</Text>
                  <Input
                    onChange={(value) => setDeadline(value as Date)}
                    value={deadline}
                    autoCapitalize="none"
                    placeholder="00:00"
                    keyboardType="numeric"
                    date
                    dateMode="time"
                  />
                </View>
              </View>
            </View>
          </View>
          <Button
            style={styles.button}
            onClick={handleAddTasksCompletion}
            disabled={chipList.length === 0}
          >
            Save Changes
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { width: '90%', height: '90%' },
  header: { alignItems: 'center', height: '15%' },
  title: { fontSize: 20, marginVertical: 20 },
  formContainer: { height: '75%', justifyContent: 'space-between' },
  content: { flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%' },
  timeSelector: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: 10 },
  button: { marginTop: 30 },
});