import React, { useState, useRef } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Button, Title } from 'react-native-paper';
import Background from '../components/Background';
import { emailValidator } from '../components/helpers/emailValidator';
import { roomStyle } from '../styles/styles';
import TextInput from '../components/TextInput';
import auth from '@react-native-firebase/auth';
import FlashMessage from 'react-native-flash-message';


export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const flashMessage = useRef();

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    auth()
      .sendPasswordResetEmail(email.value)
      .then(user => {
        flashMessage.current.showMessage({
          message: 'Please check your Email',
          type: "success",
          titleStyle: roomStyle.flashMessageTitle,
          floating: true,
          icon: 'success'
        });
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/user-not-found') {
          flashMessage.current.showMessage({
            message: 'No user Found, Sign up first!',
            type: "warning",
            titleStyle: roomStyle.flashMessageTitle,
            floating: true,
            icon: 'warning'
          });
        }else {
          flashMessage.current.showMessage({
            message: `Error, can't send password reset link`,
            type: "danger",
            titleStyle: roomStyle.flashMessageTitle,
            floating: true,
            icon: 'danger'
          });
        }
      });
  };

  return (
    <ScrollView contentContainerStyle={roomStyle.container} showsVerticalScrollIndicator={false}>
      <FlashMessage ref={flashMessage} position="top" />
      <Background>
        <Title style={roomStyle.loginTitle}>Reset Password</Title>
        <TextInput
          label="E-mail address"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          returnKeyType="done"
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          description="You will receive email with password reset link."
        />
        <Button
          color="#7B69B2"
          mode="contained"
          onPress={sendResetPasswordEmail}
          style={roomStyle.loginButton}>
          Send Instructions
        </Button>
      </Background>
    </ScrollView>
  );
}
