import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, Switch, Button, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Title, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { roomStyle } from '../styles/styles';

Icon.loadFont();
const numColumns = 2;

const Item = ({ data }) => {
    const [startDatetime, setStartDatetime] = useState('');
    const [endDatetime, setEndDatetime] = useState('');

    return (
        <ScrollView style={roomStyle.container}>
            <View style={roomStyle.item}>
                <Icon style={roomStyle.itemIcon} name={data.imageOn} />
                <Text style={roomStyle.itemText}> {data.title} </Text>

                <TextInput
                    style={roomStyle.datetimeInput}
                    value={startDatetime}
                    onChangeText={setStartDatetime}
                    placeholder="Start Datetime"
                />
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
        { id: 1, title: 'Living Room', imageOn: 'power-plug' },
        { id: 2, title: 'Bathroom', imageOn: 'power-plug' },
        { id: 3, title: 'Bedroom', imageOn: 'power-plug' },
        { id: 4, title: 'Kitchen', imageOn: 'power-plug' },
    ];

    const getHeader = () => {
        return (
            <Appbar.Header style={roomStyle.barHeader}>
                <Appbar.Content
                    title="SCHEDULING"
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
