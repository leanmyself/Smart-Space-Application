import React, { useState, useRef, useContext } from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, View, Image, Keyboard, Pressable } from 'react-native';
import { Text, Button, Title, TextInput as Input } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FlashMessage from 'react-native-flash-message';

import { emailValidator } from '../components/helpers/emailValidator';
import { passwordValidator } from '../components/helpers/passwordValidator';
import { togglePassword } from '../components/helpers/togglePassword';
import { SignInContext } from './contexts/authContext'
import Background from '../components/Background';
import TextInput from '../components/TextInput';
import { roomStyle } from '../styles/styles';

export default function LoginScreen({ navigation }) {

  const { dispatchSignedIn } = useContext(SignInContext)
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = togglePassword();
  const flashMessage = useRef();
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(user => {
        console.log(user);
        if (user) {
          dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: "signed-in" } })
          navigation.replace('BottomNavigate')
        };
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/user-not-found') {
          flashMessage.current.showMessage({
            message: 'No user Found, Sign up first!',
            type: "danger",
            titleStyle: roomStyle.flashMessageTitle,
            floating: true,
            icon: 'danger'
          });
        }
        else {
          flashMessage.current.showMessage({
            message: 'Please check your email and password.',
            type: "warning",
            titleStyle: roomStyle.flashMessageTitle,
            floating: true,
            icon: 'warning'
          });
        }
        if (error.code == 'auth/');
      })
      .finally(() => setLoading(false)); // set loading to false when login process is finished
  };

  return (
    <ScrollView contentContainerStyle={roomStyle.container} showsVerticalScrollIndicator={false}>
      <FlashMessage ref={flashMessage} position="top" />
      <Background>
        <Title style={roomStyle.loginTitle}>Sign In</Title>
        <TextInput
          label="Email"
          returnKeyType="next"
          onChangeText={email => setEmail({ value: email, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          blurOnSubmit={false}
          left={<Input.Icon name={() => (
            <Ionicons name={"mail-outline"} size={15} color="#674188" />
          )} />}
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          onChangeText={password => setPassword({ value: password, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry={passwordVisibility}
          blurOnSubmit={false}
          onSubmitEditing={Keyboard.dismiss}
          left={<Input.Icon name={() => (
            <Ionicons name={"lock-closed-outline"} size={15} color="#674188" />
          )} />}
          right={
            <Input.Icon
              name={() => (
                <FontAwesome name={rightIcon} size={15} color="#674188" />
              )}
              onPress={handlePasswordVisibility}
            />
          }
        />

        <View style={roomStyle.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}>
            <Text style={roomStyle.loginText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          color="#7B69B2"
          onPress={onLoginPressed}
          style={roomStyle.loginButton}>Login
        </Button>
        {loading && (
          <ActivityIndicator
            animating={true}
            color='#674188'
            size="large"
            style={roomStyle.loginActivityIndicator}
          />
        )}
      </Background>
    </ScrollView>

  );
}
