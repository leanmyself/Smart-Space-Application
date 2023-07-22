import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        outlineColor="#9F73AB"
        activeOutlineColor="#645CAA"
        underlineColor="transparent"
        mode="outlined"
        selectionColor="#3F3B6C"

        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  description: {
    fontSize: 13,
    paddingTop: 8,
    fontFamily: 'FiraSans-Regular',
  },
  error: {
    fontFamily: 'FiraSans-Regular',
    fontSize: 13,
    paddingTop: 8,
  },
});
