import React from 'react'
import {StyleSheet, KeyboardAvoidingView, ImageBackground } from 'react-native'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('./IMG/screen.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
    justifyContent: 'center',
  },
})
