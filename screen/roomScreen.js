import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import { Card, Title, Appbar } from 'react-native-paper';

import { roomStyle } from '../styles/styles';

const data = [
  {
    key: 'Living Room',
    screenName: 'LivingRoom',
    image: require('../components/IMG/symbol/living-room.png'),
  },
  {
    key: 'Kitchen',
    screenName: 'Kitchen',
    image: require('../components/IMG/symbol/kitchen.png'),
  },
  {
    key: 'Bedroom',
    screenName: 'Bedroom',
    image: require('../components/IMG/symbol/bedroom.png'),
  },
  {
    key: 'Bathroom',
    screenName: 'Bathroom',
    image: require('../components/IMG/symbol/bathroom.png'),
  },
  {
    key: 'Outdoor',
    screenName: 'Outdoor',
    image: require('../components/IMG/symbol/outdoor.png'),
  },
];

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

const numColumns = 2;

export default function RoomScreen({ navigation }) {
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return (
        <ScrollView style={roomStyle.container}>
          <View style={[roomStyle.itemText, roomStyle.itemInvisible]}>
            <Image source={item.image} style={roomStyle.itemImage} />
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView style={roomStyle.container}>
        <View style={roomStyle.item}>
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screenName)}>
            <Image source={item.image} style={roomStyle.itemImage} />
            <Text
              style={{
                textAlign: 'center',
                color: '#544C91',
                marginTop: 10,
                fontFamily: 'FiraSans-Medium',
              }}>
              {item.key}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: '#FFF' }}>
      <Appbar.Header style={roomStyle.barHeader}>
        <Appbar.Content
          title="MY ROOMS"
          color="#371B58"
          titleStyle={{ fontFamily: 'FiraSans-Medium' }}
        />

      </Appbar.Header>
      <FlatList
        ListHeaderComponent={this.renderListHeader}
        data={formatData(data, numColumns)}
        showsVerticalScrollIndicator={false}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
    </SafeAreaProvider>
  );
}
