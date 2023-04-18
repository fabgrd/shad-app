import React, { useState } from 'react';
import { View, Button } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const TimePicker = (): JSX.Element => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState<boolean>(false);

  const SelectTime = (event: DateTimePickerEvent, selectedTime?: Date): void => {
    const currentTime = selectedTime || time;
    setShow(false);
    setTime(currentTime);
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    console.log(`${hours}:${minutes}`);
  };

  const showTimepicker = (): void => {
    setShow(true);
  };

  const title = time.toLocaleTimeString([], {timeStyle: 'short'});

  return (
    <View>
      <Button onPress={showTimepicker} title={title} />
      {show && (
        <DateTimePicker
          testID="timePicker"
          value={time}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={SelectTime}
        />
      )}
    </View>
  );
};

export default TimePicker;
