import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screen/homeScreen';
import RoomScreen from '../screen/roomScreen';
import UserScreen from '../screen/userScreen';
import ScheduleScreen from '../screen/scheduleScreen'

import { roomStyle } from '../styles/styles';

const Tab = createBottomTabNavigator();

export default function BottomNavigate() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#371B58',
          tabBarInactiveTintColor: '#371B58',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              color='#371B58'
              size={20}></Ionicons>
          ),
        }}
      />
      <Tab.Screen
        name="Rooms"
        component={RoomScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#371B58',
          tabBarInactiveTintColor: '#371B58',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color='#371B58'
              size={20}></Ionicons>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Scheduling"
        component={ScheduleScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#371B58',
          tabBarInactiveTintColor: '#371B58',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'alarm' : 'alarm-outline'}
              color='#371B58'
              size={20}></Ionicons>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={UserScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#371B58',
          tabBarInactiveTintColor: '#371B58',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'ios-person' : 'ios-person-outline'}
              color='#371B58'
              size={20}></Ionicons>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
