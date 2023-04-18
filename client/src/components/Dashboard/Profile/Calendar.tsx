import { View, Text } from 'react-native'

// Components
import BarChart from './BarChart'

// Moment
import moment from 'moment'

// MOCK DATA
import Section from '../Section'
import { User } from '../../../types/User'

type CalendarProps = {
  user: User
}

const Test = () => {
  return (
    <View>
      <Text>Test</Text>
    </View>
  )
}

const Calendar = ({
  user
}: CalendarProps) => {

  // Get the last 7 days using moment and convert them to string
  const last7Days = []
  for (let i = 7; i > 0; i--) {
    last7Days.push(moment().subtract(i, 'days').format('ddd'))
  }

  const last7RoutinesDeadline = []

  for (let i = 0; i < 7 && i < user?.previousRoutineEnding?.length; i++) {
    const routineDeadline = parseInt(moment((user.routine.deadline as any)[i]).format('HH'))
    last7RoutinesDeadline.push(routineDeadline)
  }
  last7RoutinesDeadline.reverse()

  const last7RoutinesCompleted = []
  for (let i = 0; i < 7 && i < user?.previousRoutineEnding?.length; i++) {
    const routinFinished = parseInt(moment((user.previousRoutineEnding as any)[i]).format('HH'))
    last7RoutinesCompleted.push(routinFinished)
  }

  while (last7RoutinesCompleted?.length < 7) {
    last7RoutinesCompleted.push(0)
  }
  last7RoutinesCompleted.reverse()

  const data = {
    labels: last7Days,
    datasets: [
      {
        data: last7RoutinesCompleted,
      },
    ],
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontFamily: 'Roboto-Bold',
          color: 'black',
          margin: 5,
          textAlign: 'center',
          marginVertical: 10,
        }}
      >
        Calendar
      </Text>
      <Section>
        <BarChart
          labels={data.labels}
          data={data}
        />
      </Section>
    </View>
  )
}

export default Calendar