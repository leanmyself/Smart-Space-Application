import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import LoginScreen from '../authentication/loginScreen';
import RegisterScreen from '../authentication/registerScreen';
import ResetPasswordScreen from '../authentication/resetPasswordScreen';
import WelcomeScreen from '../authentication/welcomeScreen';

const Auth = createStackNavigator();

export function AuthStack() {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <Auth.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <Auth.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <Auth.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
    </Auth.Navigator>
  );
}
