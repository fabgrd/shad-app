import React, { useState } from 'react';
import { View, Button } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const DatePicker = (): JSX.Element => {
  const [date, setDate] = useState<Date>(new Date(1598051730000));
  const [show, setShow] = useState<boolean>(false);

  const SelectDate = (event: DateTimePickerEvent, selectedDate?: Date): void => {
    const currentDate = selectedDate || date;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    setShow(false);
    setDate(currentDate);
    console.log(`${year}-${month}-${day}`);
  };

  const showDatepicker = (): void => {
    setShow(true);
  };

  const title = date.toLocaleDateString();

  return (
    <View>
      <Button onPress={showDatepicker} title={title} />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={SelectDate}
        />
      )}
    </View>
  );
};

export default DatePicker;
