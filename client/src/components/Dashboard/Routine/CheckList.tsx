import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

// Components
import Section from '../../../components/Dashboard/Section'

// Moment
import Moment from 'react-moment';

// Colors
import colors from '../../../styles/colors';

// Checkboxes
import BouncyCheckbox from "react-native-bouncy-checkbox";
import type { RoutineTask } from '../../../types/RoutineTask';

// Redux
import { useCheckTaskMutation } from '../../../redux/services/routine';

type CheckListProps = {
  taskList: RoutineTask[]
}

const CheckList = ({ taskList }: CheckListProps) => {
  const currentDay = <Moment element={Text} format="ddd DD MMM">{new Date()}</Moment>
  const { LIGHT_BLUE } = colors

  const [checkTask] = useCheckTaskMutation();

  return (
    <Section
      title="Routine Check-list"
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
        <Text
          style={{
            color: LIGHT_BLUE,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >{currentDay}</Text>
        {taskList?.map((task, index) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: 10,
              }}
              key={index}>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  {task.title}
                </Text>
                <Text
                  style={{
                    color: LIGHT_BLUE,
                    fontFamily: 'Roboto-Bold',
                    marginLeft: 5
                  }}
                >
                  +{task.score}
                </Text>
              </View>
              <BouncyCheckbox
                size={25}
                fillColor={LIGHT_BLUE}
                disabled={task.completed}
                isChecked={task?.completed}
                unfillColor="white"
                iconStyle={{ borderColor: "red" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ fontFamily: "Roboto" }}
                onPress={(isChecked: boolean) => {
                  checkTask({
                    taskId: (task as any)._id,
                    completed: isChecked
                  }).unwrap()
                    .then(() => console.log('Task checked'))
                    .catch((err) => console.log('Error while checking task: ', err))
                }}
              />
            </View>
          )
        })
        }
      </View>
    </Section>
  )
}

export default CheckList