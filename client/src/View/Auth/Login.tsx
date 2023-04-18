import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';

// Components
import Button from '../../components/Misc/Button';
import FormInput from '../../components/Misc/FormInput';

// Redux
import { useSignInMutation } from '../../redux/services/auth';


export default function Login({ navigation }: any) {
  const [signIn] = useSignInMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) return;

    signIn({
      "email": email,
      "password": password,
    })
      .then((res: any) => {
        console.log("res: ", res);
        if (res?.error) {
          console.log(res.error.data.error);
          setError(res.error.data.error);
          setTimeout(() => {
            setError('');
          }, 3000);
          return;
        }
      })
      .catch((err) => {
        console.log("====", err.data.error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Shad</Text>
            <Text style={styles.caption}>become your better version</Text>
          </View>
          {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
          <View style={styles.formContainer}>
            <FormInput
              label='Enter username or email'
              input={{
                placeholder: "Email",
                value: email,
                onChange: setEmail,
                keyboardType: "email-address",
                autoCapitalize: "none"
              }}
            />
            <FormInput
              label='Enter password'
              input={{
                placeholder: "Password",
                value: password,
                isPassword: true,
                onChange: setPassword,
                keyboardType: "default",
                autoCapitalize: "none"
              }}
            />
            <Button
              onClick={handleLogin}
            >
              Sign in
            </Button>
            {/* horizontal line */}
            <View style={{ width: '100%', height: 1, backgroundColor: 'black', marginVertical: 20 }} />
            <View style={styles.loginContainer}>
              <Text style={{ opacity: 0.3, marginBottom: 10 }}>Don’t have an account?</Text>
              <Button
                primary={false}
                onClick={() => navigation.navigate('Onboarding', { screen: Platform.OS === 'ios' ? 'StepOneIOS' : 'StepOneAndroid' })}
              >
                Register
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
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
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    marginBottom: 20,
  },
  caption: {
    fontFamily: 'Roboto-Light',
    fontSize: 15,
    marginBottom: 20,
    opacity: 0.3,
    textTransform: 'uppercase',
  },
  titleContainer: {
    alignItems: 'center',
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  }
});
