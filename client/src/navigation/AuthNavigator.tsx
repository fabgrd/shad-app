import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../View/Auth/Login';

const AuthStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName='Login'
    >
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;