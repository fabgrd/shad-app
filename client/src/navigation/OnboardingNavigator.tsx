import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StepOneIOS from '../View/Onboarding/StepOneIOS';
import StepOneAndroid from '../View/Onboarding/StepOneAndroid';
import StepTwo from '../View/Onboarding/StepTwo';
import StepThreeIOS from '../View/Onboarding/StepThreeIOS';
import StepThreeAndroid from '../View/Onboarding/StepThreeAndroid';
import StepFourIOS from '../View/Onboarding/StepFourIOS';
import StepFourAndroid from '../View/Onboarding/StepFourAndroid';
import StepFiveIOS from '../View/Onboarding/StepFiveIOS';
import StepFiveAndroid from '../View/Onboarding/StepFiveAndroid';

const OnboardingStack = createNativeStackNavigator();

function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen name="StepOneIOS" component={StepOneIOS} />
      <OnboardingStack.Screen name="StepOneAndroid" component={StepOneAndroid} />
      <OnboardingStack.Screen name="StepTwo" component={StepTwo} />
      <OnboardingStack.Screen name="StepThreeIOS" component={StepThreeIOS} />
      <OnboardingStack.Screen name="StepThreeAndroid" component={StepThreeAndroid} />
      <OnboardingStack.Screen name="StepFourIOS" component={StepFourIOS} />
      <OnboardingStack.Screen name="StepFourAndroid" component={StepFourAndroid} />
      <OnboardingStack.Screen name="StepFiveIOS" component={StepFiveIOS} />
      <OnboardingStack.Screen name="StepFiveAndroid" component={StepFiveAndroid} />
    </OnboardingStack.Navigator>
  );
}

export default OnboardingNavigator;