import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { Title, Button, Appbar, HelperText, Avatar } from 'react-native-paper';
import { StyleSheet, Text, View, Alert, RefreshControl, ScrollView, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { roomStyle } from '../styles/styles';
import auth from '@react-native-firebase/auth';
import { SignInContext } from '../authentication/contexts/authContext';
import notifee from '@notifee/react-native';
import TextInput from '../components/TextInputUser';
import { passwordValidatorProfile } from '../components/helpers/passwordValidator';
import { nameValidator } from '../components/helpers/nameValidator';
import FlashMessage from 'react-native-flash-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function UserScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const flashMessage = useRef();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    auth().currentUser.reload()
      .then(() => {
        const user = auth().currentUser;
        setUser(user);
        setRefreshing(false);
      })
  }, []);

  const [user, setUser] = useState();
  const [name, setName] = useState({ value: '', error: null });
  const [currentPassword, setcurrentPassword] = useState({ value: '', error: null });
  const [newPassword, setnewPassword] = useState({ value: '', error: null });
  const [photo, setPhoto] = useState(null);
  const [edit, setEdit] = useState(false);
  const { dispatchSignedIn } = useContext(SignInContext)
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user', (user));
        setUser(user);
        setIsEmailVerified(user?.emailVerified);
        setName({ value: user.displayName || '', error: null });
      } else {
        setUser(null);
      }
    });
    return subscriber;
  }, [user]);


  async function signOut() {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [{
        text: 'Confirm',
        onPress: () => {
          try {
            auth()
              .signOut()
              .then(
                () => {
                  console.log("USER SUCCESSFULLY SIGNED OUT")
                  dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: null } })
                })

          } catch (error) {
            Alert.alert(error.code)
          }
        },
      },],
      { cancelable: true },
    );
  };

  const updateDisplayName = async () => {
    const nameError = nameValidator(name.value);
    const currentPasswordError = passwordValidatorProfile(currentPassword.value);
    const newPasswordError = passwordValidatorProfile(newPassword.value);

    if (nameError || currentPasswordError || newPasswordError) {
      setName({ ...name, error: nameError });
      setcurrentPassword({ ...currentPassword, error: currentPasswordError });
      setnewPassword({ ...newPassword, error: newPasswordError });
      return;
    }
    try {
      const user = auth().currentUser;
      await user.updateProfile({
        displayName: name.value
      });
      if (currentPassword.value && newPassword.value) {
        const cred = auth.EmailAuthProvider.credential(user.email, currentPassword.value);
        await user.reauthenticateWithCredential(cred);
        await user.updatePassword(newPassword.value);
        flashMessage.current.showMessage({
          message: 'Password changed.',
          type: "success",
          titleStyle: roomStyle.flashMessageTitle,
          floating: true,
          icon: 'success'
        });
      }
      setEdit(false);
    } catch (error) {
      flashMessage.current.showMessage({
        message: 'Current Password is invalid.',
        type: "danger",
        titleStyle: roomStyle.flashMessageTitle,
        floating: true,
        icon: 'danger'
      });
      console.log(error);
    }
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleResendVerificationEmail = () => {
    const user = auth().currentUser;

    user.sendEmailVerification()
      .then(() => {
        showMessage({
          message: `Verification Link send to your email, ${user.email}`,
          type: "success",
          titleStyle: roomStyle.flashMessageTitle,
          floating: true
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  return (
    <>
      <SafeAreaProvider>
        <FlashMessage ref={flashMessage} position="top" />
        <Appbar.Header style={roomStyle.barHeader}>
          <Appbar.Content
            title="ACCOUNT"
            color="#3c2a4d"
            titleStyle={{ fontFamily: 'FiraSans-Medium' }}
          />
        </Appbar.Header>
        <ScrollView
          contentContainerStyle={roomStyle.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {user ? (
            <>
              <View style={roomStyle.headerContainer}>
                <Image
                  style={roomStyle.coverPhoto}
                  source={require('../components/IMG/screen.png')}
                />
                <View style={roomStyle.profileContainer}>
                  <Avatar.Text size={120} label={user.displayName.substring(0, 1)} color='#624F82' style={roomStyle.avatar} />
                </View>
                <Text style={roomStyle.userName}>{user.displayName}</Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                {isEmailVerified ? (
                  <Text style={roomStyle.emailVerified}>Verified! <MaterialIcons name='verified' size={15}></MaterialIcons></Text>
                ) : (
                  <>
                    <Text style={roomStyle.emailnotVerified}>Please verify your email address!</Text>
                    <TouchableOpacity onPress={handleResendVerificationEmail}>
                      <Text style={roomStyle.resendLink}>Resend Link <MaterialIcons name="mark-email-unread" size={15}></MaterialIcons></Text>
                    </TouchableOpacity>
                  </>

                )}
              </View>

              <View style={roomStyle.userBtnWrapper}>

                <TouchableOpacity
                  style={roomStyle.userBtn}
                  onPress={edit ? updateDisplayName : toggleEdit}>
                  <Text style={roomStyle.userBtnTxt}>{edit ? 'Save Changes' : 'Edit Profile'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={roomStyle.userBtn} onPress={() => signOut()}>
                  <Text style={roomStyle.userBtnTxt}>Logout</Text>
                </TouchableOpacity>
              </View>

              <View style={{ margin: 10 }}>
                <TextInput
                  label="Name"
                  mode="outlined"
                  value={name.value}
                  onChangeText={text => setName({ value: text, error: null })}
                  error={!!name.error}
                  errorText={name.error}
                  style={roomStyle.userInput}
                  outlineColor="#9F73AB"
                  activeOutlineColor="#645CAA"
                  underlineColor="transparent"
                  selectionColor="#3F3B6C"
                  editable={edit}
                />
                <TextInput
                  label="Email"
                  mode="outlined"
                  value={user.email ? user.email : user.email}
                  style={roomStyle.userInput}
                  outlineColor="#9F73AB"
                  activeOutlineColor="#645CAA"
                  underlineColor="transparent"
                  selectionColor="#3F3B6C"
                  editable={false}
                  disabled={edit}
                />

                {edit && (
                  <View>
                    <TextInput
                      label="Current Password"
                      mode="outlined"
                      value={currentPassword.value}
                      style={roomStyle.userInput}
                      outlineColor="#9F73AB"
                      activeOutlineColor="#645CAA"
                      underlineColor="transparent"
                      selectionColor="#3F3B6C"
                      secureTextEntry={true}
                      error={!!currentPassword.error}
                      errorText={currentPassword.error}
                      onChangeText={text => setcurrentPassword({ value: text, error: null })}
                    />

                    <TextInput
                      label="New Password"
                      mode="outlined"
                      value={newPassword.value}
                      style={roomStyle.userInput}
                      outlineColor="#9F73AB"
                      activeOutlineColor="#645CAA"
                      underlineColor="transparent"
                      selectionColor="#3F3B6C"
                      secureTextEntry={true}
                      error={!!newPassword.error}
                      errorText={newPassword.error}
                      onChangeText={text => setnewPassword({ value: text, error: null })}
                    />
                  </View>
                )}
              </View>
            </>
          ) : null}
        </ScrollView>
      </SafeAreaProvider>
    </>

  );
}
