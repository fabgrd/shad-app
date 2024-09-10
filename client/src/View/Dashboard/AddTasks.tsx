import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Switch } from 'react-native';

// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Components
import Button from '../../components/Misc/Button';
import ChipSelector from '../../components/Onboarding/ChipSelector';
import Input from '../../components/Misc/Input';

// Redux
import { useDispatch } from 'react-redux';
import { useAddTasksMutation, useDeleteTasksMutation } from '../../redux/services/routine';

export default function AddTasks({ navigation }: any) {
  const [chipList, setChipList] = useState<string[]>([
    'I didn\'t bite my nails',
    'I worked 25mn continuously on',
  ]);
  const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();

  // Utilisation des mutations pour ajouter et supprimer des tâches
  const [addTask] = useAddTasksMutation();
  const [deleteTask] = useDeleteTasksMutation();

  const handleAddTasksCompletion = () => {
    // Préparation des tâches à ajouter
    const tasksToAdd = chipList.map(task => ({
      title: task,
      score: 10,
      completed: false,
    }));

    // Envoie des tâches
    addTask({ tasksToAdd })
      .unwrap()
      .then(res => {
        console.log('Tasks added:', res);
        // Dispatch après que les tâches aient été ajoutées avec succès
        dispatch({
          type: 'user/updateTasks',
          payload: tasksToAdd
        })
      })
      .catch(err => {
        console.log('Error adding tasks:', err);
      });
      navigation.navigate('HomeNavigator', { screen: "DailyRoutine" })
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask({ taskId })
      .unwrap()
      .then(res => {
        console.log('Task deleted:', res);
      })
      .catch(err => {
        console.log('Error deleting task:', err);
      });
  };

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
                  <Text style={{ fontWeight: "bold" }}>Routine Deadline</Text>
                  <Input
                    onChange={(value) => setTime(value as Date)}
                    value={time}
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
          <Button style={styles.button}
            onClick={handleAddTasksCompletion}
            disabled={chipList.length === 0}
          >
            Add
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
  button: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 30 }
});
