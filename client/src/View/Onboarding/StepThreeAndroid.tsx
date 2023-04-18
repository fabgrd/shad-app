import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Switch, Platform } from 'react-native';

// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Components
import Button from '../../components/Misc/Button';
import TimePicker from '../../components/Misc/TimePicker';
import FormInput from '../../components/Misc/FormInput';
import ProgressBar from '../../components/Onboarding/ProgressBar';
import ChipSelector from '../../components/Onboarding/ChipSelector';
import Input from '../../components/Misc/Input';

export default function StepThree({ navigation }: any) {
  const [chipList, setChipList] = useState<string[]>([
    'I didn\'t bite my nails',
    'I worked 25mn continuously on',
  ]);
  const [time, setTime] = useState(new Date());

  const [notification, setNotification] = useState(false);


  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <ProgressBar
              current={3}
              total={5}
            />
            <Text style={styles.title}>Add activities of your own routine</Text>
          </View>
          <View style={styles.formContainer}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%'
              }}
            >
              <ChipSelector
                chipList={chipList}
                setChipList={setChipList}
                placeholder='Write your own activity'
              />
              <View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 20,
                    padding: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      width: '90%',
                      padding: 10,
                    }}
                  >
                    <MaterialCommunityIcons name='clock-outline' size={50} />
                    <View>
                      <Text style={{ fontWeight: "bold" }}>Routine Deadline</Text>
                      <Text>To complete before...</Text>
                    </View>
                  </View>
                  <TimePicker />
                </View>StepFour
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginRight: 10,
                    }}
                  >I allow shad to send me notifications</Text>
                  <Switch
                    trackColor={{ false: '#767577', true: '#1DA0FF66' }}
                    thumbColor={notification ? 'black' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setNotification}
                    value={notification} />
                </View>
              </View>
            </View>
          </View>
          <Button
            onClick={() => navigation.navigate('Onboarding', { screen: Platform.OS === 'ios' ? 'StepFourIOS' : 'StepFourAndroid' })}
            >
            Add
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '15%'
  },
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  caption: {
    fontFamily: 'Roboto-Light',
    fontSize: 15,
    marginBottom: 20,
    opacity: 0.3,
    textTransform: 'uppercase',
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '75%',
  },
});
