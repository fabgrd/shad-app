import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StepOneIOS from '../View/Onboarding/StepOneIOS';
import StepOneAndroid from '../View/Onboarding/StepOneAndroid';
import StepTwo from '../View/Onboarding/StepTwo';
import StepReward from '../View/Onboarding/StepReward';

const OnboardingStack = createNativeStackNavigator();

function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="StepOneIOS" component={StepOneIOS} />
      <OnboardingStack.Screen name="StepOneAndroid" component={StepOneAndroid} />
      <OnboardingStack.Screen name="StepTwo" component={StepTwo} />
      <OnboardingStack.Screen name="StepReward" component={StepReward} />
    </OnboardingStack.Navigator>
  );
}

export default OnboardingNavigator;
