import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';

// Components
import Button from '../../components/Misc/Button';
import ProgressBar from '../../components/Onboarding/ProgressBar';
import OnboardingGoals from '../../components/Onboarding/OnboardingGoal';

// Images
import ImageLearning from '../../../assets/images/Onboarding/ImageLearning';
import ImageReading from '../../../assets/images/Onboarding/ImageReading';

export default function StepTwo({ navigation }: any) {

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <ProgressBar
              current={2}
              total={4}
            />
            <Text style={styles.title}>First, choose your daily checklist.</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.goalContainer}>
              <OnboardingGoals
                Image={ImageLearning}
                goal="Today, I learn something new ..."
              />
              <OnboardingGoals
                Image={ImageReading}
                goal="Today, I read ... pages of a book."
                reverse
              />
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
                  style={{ width: '45%' }}
                  onClick={() => navigation.navigate('Onboarding', { screen: Platform.OS === 'ios' ? 'StepThreeIOS' : 'StepThreeAndroid' })}
                >
                  Add my own template
                </Button>
              </View>
            </View>
          </View>
          <Button
            onClick={() => navigation.navigate('Onboarding', { screen: Platform.OS === 'ios' ? 'StepFourIOS' : 'StepFourAndroid' })}
          >
            Continue
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: '90%',
    height: '90%',
    alignItems: 'center',
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
    justifyContent: 'space-around',
    height: '75%',
  },
  goalContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
