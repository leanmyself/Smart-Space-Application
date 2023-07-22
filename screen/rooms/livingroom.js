import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Switch, Button, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { roomStyle } from '../../styles/styles';
import firestore from '@react-native-firebase/firestore';

Icon.loadFont();
const Item = ({ data }) => {
  const [isSwitchEnabled, toggleSwitch] = React.useState(data.switch);
  const [isModalVisible, setModalVisible] = useState(false);
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const unsubscribe = firestore().collection('home-devices').doc('LIVING-ROOM').onSnapshot((documentSnapshot) => {
      if (data.title === "Fan") {
        toggleSwitch(documentSnapshot.data().FAN === "FLHIGH");
      } else if (data.title === "Light Bulb") {
        toggleSwitch(documentSnapshot.data().LIGHTS === "LLHIGH");
      } else if (data.title === "Outlet") {
        toggleSwitch(documentSnapshot.data().OUTLET === "OLHIGH");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSwitchChange = async () => {
    const newSwitchValue = !isSwitchEnabled;
    toggleSwitch(newSwitchValue);
    const fanSwitchValue = newSwitchValue ? "FLHIGH" : "FLLOW";
    const lightSwitchValue = newSwitchValue ? "LLHIGH" : "LLLOW";
    const outletSwitchValue = newSwitchValue ? "OLHIGH" : "OLLOW";
    const batch = firestore().batch();
    const docRef = firestore().collection('home-devices').doc('LIVING-ROOM');

    if (data.title === "Fan") {
      batch.update(docRef, { FAN: fanSwitchValue });
    } else if (data.title === "Light Bulb") {
      batch.update(docRef, { LIGHTS: lightSwitchValue });
    } else if (data.title === "Outlet") {
      batch.update(docRef, { OUTLET: outletSwitchValue });
    }
    await batch.commit();
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
      <TouchableWithoutFeedback onPress={toggleModal}>
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
            {isSwitchEnabled ? 'Switch: ON' : 'Switch: OFF'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

  while (
    numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

const numColumns = 2;

export default function Livingroom({ navigation }) {

  const data = [
    { id: 1, title: 'Light Bulb', imageOff: 'lightbulb-off', imageOn: 'lightbulb-on', switch: false },
    { id: 2, title: 'Fan', imageOff: 'fan-off', imageOn: 'fan', switch: false },
    { id: 3, title: 'Outlet', imageOff: 'power-plug-off', imageOn: 'power-plug', switch: false },
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
          title="LIVING ROOM"
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
