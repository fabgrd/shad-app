import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../components/Misc/Button';
import ChipSelector from '../../components/Onboarding/ChipSelector';
import Input from '../../components/Misc/Input';
import { useDispatch, useSelector } from 'react-redux';
import { useAddTasksMutation, useRemoveTasksMutation, useGetRoutineQuery } from '../../redux/services/routine';

interface Task {
  _id: string;
  title: string;
  score: number;
  completed: boolean;
}

export default function AddTasks({ navigation }: any) {
  const [chipList, setChipList] = useState<string[]>([]);
  const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.user?.user);

  // Utilisation des mutations pour ajouter et supprimer des tâches
  const [addTask] = useAddTasksMutation();
  const [removeTask] = useRemoveTasksMutation();

  // Utilisation de la requête pour obtenir la routine et les tâches existantes
  const { data: routine, isLoading } = useGetRoutineQuery(user?.routine?.tasks);

  // Mise à jour des tâches existantes au chargement de la routine
  useEffect(() => {
    if (routine && !isLoading) {
      const existingTasks = user?.routine?.tasks.map((task: Task) => task.title);
      setChipList(existingTasks); // Initialisation avec les tâches existantes
    }
  }, [routine, isLoading]);
  
  const handleAddTasksCompletion = () => {
    // Créer une liste de titres de tâches existantes dans la routine
    const existingTaskTitles = user?.routine?.tasks.map((task: Task) => task.title);
  
    // Filtrer les nouvelles tâches à ajouter
    const newTasks = chipList.filter(taskTitle => !existingTaskTitles.includes(taskTitle));
    console.log("New tasks: ", newTasks);
  
    // Mapper les nouvelles tâches pour les ajouter
    const tasksToAdd = newTasks.map(task => ({
      title: task,
      score: 10,
      completed: false,
    }));
  
    // Filtrer les tâches à supprimer (celles qui ne sont plus dans le chipList)
    const oldTasks = existingTaskTitles.filter((taskTitle: string) => !chipList.includes(taskTitle));
    // console.log("Old Tasks names: ", oldTasks);
  
    // Trouver les IDs des tâches à supprimer
    const tasksToRemove = user?.routine?.tasks
      .filter((task: Task) => oldTasks.includes(task.title))
      .map((task: Task) => task._id);
    console.log("TASK IDs to REMOVE: ", tasksToRemove);
  
    // Ajouter les nouvelles tâches
    if (tasksToAdd.length > 0) {
      addTask({ tasksToAdd })
        .unwrap()
        .then(res => {
          console.log('Tasks added:', res);
          dispatch({
            type: 'user/updateTasks',
            payload: tasksToAdd,
          });
        })
        .catch(err => {
          console.log('Error adding tasks:', err);
        });
    } else {
      console.log('No new tasks to add');
    }
  
    // Supprimer les tâches
    if (tasksToRemove.length > 0) {
      removeTask({ tasksToRemove })
        .unwrap()
        .then(res => {
          console.log('Tasks removed:', res);
          dispatch({
            type: 'user/updateTasks',
            payload: tasksToRemove,
          });
        })
        .catch(err => {
          console.log('Error removing tasks:', err);
        });
    } else {
      console.log('No tasks to remove');
    }
  
    // Navigation après l'ajout/suppression des tâches
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
                // onDelete={handleDeleteTask}  // Ajout du support pour supprimer une tâche
                placeholder="Write your own activity"
              />
              <View style={styles.timeSelector}>
                <MaterialCommunityIcons name="clock-outline" size={50} />
                <View>
                  <Text style={{ fontWeight: 'bold' }}>Routine Deadline</Text>
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
          <Button
            style={styles.button}
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
  button: { marginTop: 30 },
});
