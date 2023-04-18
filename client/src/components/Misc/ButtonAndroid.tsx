import React, { useState } from 'react';
import { View, Button } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const ButtonAndroid = (): JSX.Element => {
  const [date, setDate] = useState<Date>(new Date(1598051730000));
  const [show, setShow] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = (): void => {
    setShow(true);
  };

  return (
    <View>
      <Button onPress={showDatepicker} title="Show date picker!" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default ButtonAndroid;
