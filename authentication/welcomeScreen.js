import React, { useState, useRef, useEffect, useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Title, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { SignInContext } from './contexts/authContext';
import Welcome from '../components/Welcome';
import { roomStyle } from '../styles/styles';

export default function WelcomeScreen({ navigation }) {
  const { dispatchSignedIn } = useContext(SignInContext);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        dispatchSignedIn({
          type: 'UPDATE_SIGN_IN',
          payload: { userToken: 'signed-in' },
        });
      } else {
        dispatchSignedIn({ type: 'UPDATE_SIGN_IN', payload: { userToken: null } });
      }
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={roomStyle.container}
      showsVerticalScrollIndicator={false}>
      <Welcome>
        <Title style={roomStyle.loginHeader}>SMART SPACE</Title>
        <Button
          mode="contained"
          color="#7B69B2"
          onPress={() => navigation.navigate('LoginScreen')}
          style={roomStyle.loginButton}>
          Sign In
        </Button>
      </Welcome>
    </ScrollView>
  );
}
