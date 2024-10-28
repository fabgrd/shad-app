import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// Components
import Section from '../../../components/Dashboard/Section';
import AddTasks from '../../../View/Dashboard/AddTasks';

// Moment
import Moment from 'react-moment';

// Colors
import colors from '../../../styles/colors';

// Checkboxes
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import type { RoutineTask } from '../../../types/RoutineTask';

// Redux
import { useCheckTaskMutation } from '../../../redux/services/routine';
import { useGetRoutineQuery } from '../../../redux/services/routine';

// Assume this is a custom button component
import Button from '../../Misc/Button';
import { NavigationProps } from '../../../types/Props/NavigationProps';

type CheckListProps = {
  taskList: RoutineTask[];
};

const CheckList = ({ taskList }: CheckListProps) => {
  const navigation = useNavigation<NavigationProps['navigation']>();
  const currentDay = <Moment element={Text} format="ddd DD MMM">{new Date()}</Moment>;
  const { LIGHT_BLUE, LIGHT_BLACK } = colors;
  const [checkTask] = useCheckTaskMutation();

  const { refetch } = useGetRoutineQuery(undefined, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    console.log("REFETCH ROUTINE DATA");
    refetch();
  }, [refetch]);

  return (
    <Section title="Routine Check-list">
      <Text style={styles.dateText}>{currentDay}</Text>
      <View style={styles.container}>
        {taskList?.map((task, index) => (
          <View style={styles.taskContainer} key={index}>
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskScore}>+{task.score}</Text>
            </View>
            <BouncyCheckbox
              size={25}
              fillColor={LIGHT_BLUE}
              disabled={task.completed}
              isChecked={task?.completed}
              unfillColor="white"
              iconStyle={{ borderColor: 'red' }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{ fontFamily: 'Roboto' }}
              onPress={(isChecked: boolean) => {
                checkTask({
                  taskId: (task as any)._id,
                  completed: isChecked,
                })
                  .unwrap()
                  .then(() => console.log('Task checked'))
                  .catch((err) => console.log('Error while checking task: ', err));
              }}
            />
          </View>
        ))}
        {/* Add Task Button */}
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <Button
            primary={false}
            style={styles.modifyButton}
            onClick={() => navigation.navigate('AddTasks', { screen: 'AddTasks' })}
          >
            Modify tasks
          </Button>
        </View>
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
    width: '100%',
  },
  dateText: {
    marginTop: -20,
    color: colors.LIGHT_BLUE,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  taskInfo: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  taskScore: {
    color: colors.LIGHT_BLUE,
    fontFamily: 'Roboto-Bold',
    marginLeft: 5,
  },
  modifyButton: {
    marginTop: 10,
    width: '50%',
    alignItems: 'center',
    padding: 10,
  },
});

export default CheckList;
