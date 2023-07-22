import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, Switch, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Title, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { roomStyle } from '../../styles/styles';

Icon.loadFont();
const numColumns = 2;

const Item = ({ data }) => {
  const [isSwitchEnabled, toggleSwitch] = React.useState(data.switch);

  useEffect(() => {
    const unsubscribe = firestore().collection('home-devices').doc('OUTDOOR').onSnapshot((documentSnapshot) => {
      if (data.title === "Window") {
        toggleSwitch(documentSnapshot.data().WINDOW === "WHIGH");
      } else if (data.title === "Door") {
        toggleSwitch(documentSnapshot.data().DOOR === "DHIGH");
      } else if (data.title === "Light") {
        toggleSwitch(documentSnapshot.data().LIGHT === "LHIGH");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [data.title]);

  const handleSwitchChange = async () => {
    const newSwitchValue = !isSwitchEnabled;
    toggleSwitch(newSwitchValue);
    const windowValue = newSwitchValue ? "WHIGH" : "WLOW";
    const doorValue = newSwitchValue ? "DHIGH" : "DLOW";
    const lightSwitchValue = newSwitchValue ? "LHIGH" : "LLOW";
    if (data.title === "Window") {
      await firestore().collection('home-devices').doc('OUTDOOR').update({
        WINDOW: windowValue
      });
    } else if (data.title === "Door") {
      await firestore().collection('home-devices').doc('OUTDOOR').update({
        DOOR: doorValue
      });
    }
    // else if (data.title === "Light") {
    //   await firestore().collection('home-devices').doc('OUTDOOR').update({
    //     LIGHT: lightSwitchValue
    //   });
    // }
  };

  if (data.empty === true) {
    return (
      <ScrollView style={roomStyle.container}>
        <View style={[roomStyle.item, roomStyle.itemInvisible]}>
          <Icon style={roomStyle.itemIcon} name={isSwitchEnabled ? data.imageOn : data.imageOff} />
          <Text style={roomStyle.itemText}> {data.title} </Text>
        </View>
        <Text style={[roomStyle.switchText, roomStyle.itemInvisible]}>
          {isSwitchEnabled ? 'Switch: ON' : 'Switch: OFF'}
        </Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={roomStyle.container}>
      <View style={roomStyle.item}>
        <Icon style={roomStyle.itemIcon} name={isSwitchEnabled ? data.imageOn : data.imageOff} />
        <Text style={roomStyle.itemText}> {data.title} </Text>
        <Switch
          onValueChange={handleSwitchChange}
          trackColor={{ false: '#CFD2CF', true: '#7B69B2' }}
          thumbColor="#FFFFFF"
          value={isSwitchEnabled}
        />
        <Text style={roomStyle.switchText}>
          {isSwitchEnabled ? 'Open' : 'Closed'}
        </Text>
      </View>
    </ScrollView>
  );
};

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

export default function Outdoor({ navigation }) {
  const data = [
    { id: 1, title: 'Door', imageOff: 'door-closed', imageOn: 'door-open', switch: false },
    { id: 2, title: 'Window', imageOff: 'window-closed-variant', imageOn: 'window-open-variant', switch: false },
    // { id: 3, title: 'Light', imageOff: 'ceiling-light-outline', imageOn: 'ceiling-light', switch: false },
  ];

  const getHeader = () => {
    return (
      <Appbar.Header style={roomStyle.barHeader}>
        <Appbar.Action
          icon="chevron-left"
          onPress={() => navigation.navigate('Rooms')}
          color="#544C91"
        />
        <Appbar.Content
          title="OUTDOOR"
          color="#544C91"
          titleStyle={{ fontFamily: 'FiraSans-Medium' }}
        />
      </Appbar.Header>
    );
  };

  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: '#FFF' }}>
        <FlatList
          ListHeaderComponent={this.renderListHeader}
          data={formatData(data, numColumns)}
          keyExtractor={item => item.id}
          ListHeaderComponent={getHeader}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Item data={item} />}
          numColumns={numColumns}
        />
      </SafeAreaProvider>
    </>
  );
}
