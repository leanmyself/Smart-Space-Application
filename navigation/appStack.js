import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import BottomNavigate from '../navigation/bottomNavigation';
import Livingroom from '../screen/rooms/livingroom';
import Kitchen from '../screen/rooms/kitchen';
import Bathroom from '../screen/rooms/bathroom';
import Bedroom from '../screen/rooms/bedroom';
import Outdoor from '../screen/rooms/outdoor';

const App = createStackNavigator();

export function AppStack() {
  return (
    <App.Navigator>
      <App.Screen
        name="BottomNavigate"
        component={BottomNavigate}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <App.Screen
        name="LivingRoom"
        component={Livingroom}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <App.Screen
        name="Kitchen"
        component={Kitchen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <App.Screen
        name="Bathroom"
        component={Bathroom}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <App.Screen
        name="Bedroom"
        component={Bedroom}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <App.Screen
        name="Outdoor"
        component={Outdoor}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
    </App.Navigator>
  );
}
