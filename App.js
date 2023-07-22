import React, { useState, useEffect } from 'react';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SignInContextProvider } from './authentication/contexts/authContext';
import RootNavigator from './navigation/rootNavigation';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { roomStyle } from './styles/styles';

export default function App() {
  const [isConnected, setIsConnected] = useState(true);
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log(token);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFCMToken();
  }, []);

  const handleConnectivityChange = (netInfo) => {
    setIsConnected(netInfo.isConnected);
    if (netInfo.isConnected) {
      hideMessage();
    } else {
      setTimeout(() => {
        showMessage({
          message: 'Connection Error',
          description: 'Oops! Looks like your device is not connected to the Internet.',
          type: 'danger',
          titleStyle: roomStyle.flashMessageTitle,
          floating: true,
          autoHide: false,
          hideOnPress: false,
          icon: 'auto'
        });
      }, 1000); // delay the display of FlashMessage by 3 seconds
    }
  };


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
    return () => unsubscribe();
  }, []);

  return (
    <SignInContextProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <RootNavigator />
        {isConnected ? <View></View> : <FlashMessage position="top" />}
      </View>
    </SignInContextProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});