import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Platform } from 'react-native';

// Components
import Button from '../../components/Misc/Button';
import FormInput from '../../components/Misc/FormInput';
import ProgressBar from '../../components/Onboarding/ProgressBar';
import DatePicker from '../../components/Misc/DatePicker';

export default function StepOne({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [date, setOpen] = useState(false)

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View
            style={styles.header}
          >
            <ProgressBar
              current={1}
              total={5}
            />
            <Text style={styles.title}>Tell me more about yourself.</Text>
          </View>
          <View style={styles.formContainer}>
            <FormInput
              label='Username'
              input={{
                placeholder: "Username",
                value: username,
                onChange: setUsername,
                keyboardType: "default",
                autoCapitalize: "none"
              }}
            />
            <FormInput
              label='Name'
              input={{
                placeholder: "Name",
                value: name,
                onChange: setName,
                keyboardType: "default",
                autoCapitalize: "none"
              }}
            />
            <FormInput
              label='E-mail'
              input={{
                placeholder: "Email",
                value: email,
                onChange: setEmail,
                keyboardType: "email-address",
                autoCapitalize: "none"
              }}
            />
            <FormInput
              label='Gender'
              input={{
                placeholder: 'Gender',
                value: gender,
                onChange: setGender,
                keyboardType: 'default',
                autoCapitalize: 'none',
              }}
            />
            <DatePicker />
          </View>
          <Button
            onClick={() => navigation.navigate('Onboarding', { screen: "StepTwo" })}
          >
            Subscribe
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
    height: '15%',
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
    alignItems: 'center',
    height: '75%',
  },
});
