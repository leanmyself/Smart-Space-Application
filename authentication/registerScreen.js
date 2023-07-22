import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Alert } from 'react-native';
import { Text, Button, Title, TextInput as Input } from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import Background from '../components/Background';
import TextInput from '../components/TextInput';
import { roomStyle } from '../styles/styles';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { emailValidator } from '../components/helpers/emailValidator';
import { passwordValidator, passwordValidatorSignup } from '../components/helpers/passwordValidator';
import { nameValidator } from '../components/helpers/nameValidator';
import { togglePassword } from '../components/helpers/togglePassword';


export default function RegisterScreen({ navigation }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = togglePassword();
  const [user, setUser] = useState();
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const flashMessage = useRef();
  const [loading, setLoading] = useState(false);

  async function onSignUpPressed() {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidatorSignup(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(userCredential => {
        flashMessage.current.showMessage({
          message: 'Registration Successful',
          type: "success",
          titleStyle: roomStyle.flashMessageTitle,
          floating: true,
          autoHide: true,
        });
        const user = userCredential.user;
        if (user) {
          auth().currentUser.updateProfile({
            displayName: name.value,
          }).then(() => {
            auth().currentUser.sendEmailVerification()
          })
            .catch(error => {
              alert(error);
              console.error(error);
            });

        }
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          flashMessage.current.showMessage({
            message: 'The email is already in use!',
            type: "warning",
            titleStyle: roomStyle.flashMessageTitle,
            floating: true,
            icon: 'warning'
          });
        } else {
          flashMessage.current.showMessage({
            message: `Error, can't create an account.`,
            type: "danger",
            titleStyle: roomStyle.flashMessageTitle,
            floating: true,
            icon: 'danger'
          });
        }
      })
      .finally(() => setLoading(false)); // set loading to false when login process is finished
  }

  return (
    <ScrollView contentContainerStyle={roomStyle.container} showsVerticalScrollIndicator={false}>
      <FlashMessage ref={flashMessage} position="top" />
      <Background>
        <Text style={roomStyle.loginTitle}>Hello!</Text>
        <Text style={roomStyle.loginTitle}>Sign up to get started</Text>
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={name => setName({ value: name, error: '' })}
          error={!!name.error}
          errorText={name.error}
          left={
            <Input.Icon
              name={() => (
                <Ionicons name={'person-outline'} size={15} color="#674188" />
              )}
            />
          }
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={email => setEmail({ value: email, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          left={
            <Input.Icon
              name={() => (
                <Ionicons name={'mail-outline'} size={15} color="#674188" />
              )}
            />
          }
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={password => setPassword({ value: password, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry={passwordVisibility}
          left={
            <Input.Icon
              name={() => (
                <Ionicons
                  name={'lock-closed-outline'}
                  size={15}
                  color="#674188"
                />
              )}
            />
          }
          right={
            <Input.Icon
              name={() => (
                <FontAwesome name={rightIcon} size={15} color="#674188" />
              )}
              onPress={handlePasswordVisibility}
            />
          }
        />
        <Button
          color="#7B69B2"
          mode="contained"
          onPress={onSignUpPressed}
          style={roomStyle.loginButton}>
          Sign Up
        </Button>
        {loading && (
          <ActivityIndicator
            animating={true}
            color='#674188'
            size="large"
            style={roomStyle.loginActivityIndicator}
          />
        )}
        <View style={roomStyle.row}>
          <Text style={roomStyle.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={roomStyle.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </ScrollView>
  );
}
