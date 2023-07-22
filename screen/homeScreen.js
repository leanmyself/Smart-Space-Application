import React, { Component, useEffect, useState, useCallback } from 'react';
import { StyleSheet, ActivityIndicator, Text, View, FlatList, Image, TextInput, RefreshControl, ScrollView, Animated } from 'react-native';
import { Card, Title, Appbar, Button } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CircularProgress from 'react-native-circular-progress-indicator';
import moment from 'moment';
import { roomStyle } from '../styles/styles';
import DateTime from '../components/DateTime';
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import { localDisplayNotification } from './notificationUtils';

Icon.loadFont();
export default function HomeNavigation({ navigation, location }) {

    const currentHour = moment().hour();
    const [refreshing, setRefreshing] = React.useState(false);
    const [user, setUser] = useState(null);
    const [sensorData, setSensorData] = useState({
        GAS: { LPG: 0 },
        SOIL: { SOIL: 0 },
        RAIN: { RAIN: 0 },
        FLAME: { FLAME: 0 },
        TEMP: { TEMPERATURE: 0, HEATINDEX: 0 },
        HUMIDITY: { HUMIDITY: 0 },
        CURRENT: { CURRENT: 0 },
        ENERGY: { ENERGY: 0 },
        POWER: { POWER: 0 }
    });
    const [prevSensorData, setPrevSensorData] = useState(sensorData);

    const greeting = currentHour >= 5 && currentHour < 12
        ? 'Good Morning'
        : currentHour >= 12 && currentHour < 18
            ? 'Good Afternoon'
            : 'Good Evening';

    const icon = currentHour >= 5 && currentHour < 12
        ? <Ionicons name="sunny-outline" size={25} />
        : currentHour >= 12 && currentHour < 18
            ? <Ionicons name="cloud-outline" size={25} />
            : <Ionicons name="moon-outline" size={25} />;

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        auth().currentUser.reload()
            .then(() => {
                const user = auth().currentUser;
                setUser(user);
                setRefreshing(false);
            })
    }, []);

    useEffect(() => {
        const db = firestore();
        const docRef = db.collection('home-sensor');

        const unsubscribe = Object.keys(sensorData).map((sensorType) =>
            docRef.doc(`${sensorType}-SENSOR`).onSnapshot((doc) => {
                if (doc && doc.exists) {
                    setSensorData((prevData) => ({
                        ...prevData,
                        [sensorType]: doc.data(),
                    }));
                }
            })
        );

        const authSubscriber = auth().onAuthStateChanged((user) => {
            setUser(user);
            console.log('user', JSON.stringify(user));
        });

        return () => {
            unsubscribe.forEach((unsub) => unsub());
            authSubscriber();
        };
    }, []);

    const [notificationDisplayed, setNotificationDisplayed] = useState(false);

    //NOTIFICATION
    useEffect(() => {
        console.log('Sensor data updated:', sensorData);

        let notifications = [];

        if (sensorData.RAIN.RAIN > 700 && sensorData.RAIN.RAIN !== prevSensorData.RAIN.RAIN) {
            notifications.push({
                title: 'Heavy Rainfall',
                body: `There is heavy rainfall occurring. Please be cautious and take necessary precautions.`,
            });
        }

        if (sensorData.GAS.LPG >= 240 && sensorData.GAS.LPG >= prevSensorData.GAS.LPG) {
            notifications.push({
                title: 'Gas Detected',
                body: `Gas levels have exceeded the safe threshold. Please ensure proper ventilation and take necessary precautions.`,
            });
        }

        if (sensorData.FLAME.FLAME < 100 && sensorData.FLAME.FLAME !== prevSensorData.FLAME.FLAME) {
            notifications.push({
                title: 'Fire Detected',
                body: 'There is a fire detected. Please check your kitchen area immediately!',
            });
        }

        if (sensorData.SOIL.SOIL < 20 && sensorData.SOIL.SOIL !== prevSensorData.SOIL.SOIL) {
            notifications.push({
                title: 'Dry Soil',
                body: `Attention! Your plant is in need of water.`,
            });
        }


        notifications.forEach((notification) => {
            localDisplayNotification(notification.title, notification.body);
        });

        setPrevSensorData(sensorData); // Remember the current sensorData for the next check
    }, [sensorData, prevSensorData]);

    const heatIndex = sensorData.TEMP.HEATINDEX;

    let heatIndexLevel;
    let textColor;
    if (heatIndex >= 80 && heatIndex <= 90) {
        heatIndexLevel = 'Caution';
        textColor = '#FFBF00'; // Yellow
    } else if (heatIndex >= 91 && heatIndex <= 103) {
        heatIndexLevel = 'Extreme Caution';
        textColor = '#FFA500'; // Orange
    } else if (heatIndex >= 104 && heatIndex <= 124) {
        heatIndexLevel = 'Danger';
        textColor = '#F97B22'; // Red
    } else if (heatIndex >= 125) {
        heatIndexLevel = 'Extreme Danger';
        textColor = '#FF0000'; // Purple
    }

    const names = [
        {
            index: '1',
            name: 'LPG Gas',
            values: sensorData.GAS.LPG,
            unit: 'PPM',
            desc: (
                <Text style={{ color: sensorData.TEMP.HEATINDEX >= 240 ? '#FF0000' : '#367E18' }}>
                    {sensorData.GAS.LPG >= 240 ?
                        'GAS DETECTED' : "YOU'RE SAFE"}
                </Text>
            ),
            image: 'warning',
        },
        {
            index: '2',
            name: 'Heat Index',
            values: sensorData.TEMP.HEATINDEX,
            unit: '°F',
            desc: (
                <Text style={{ color: textColor }}>
                    {heatIndexLevel}
                </Text>
            ),

            image: 'shirt',
        },
        {
            index: '3',
            name: 'Temperature',
            values: sensorData.TEMP.TEMPERATURE,
            unit: '°C',
            image: 'thermometer-outline',
        },
        {
            index: '4',
            name: 'Humidity',
            values: sensorData.HUMIDITY.HUMIDITY,
            unit: '%',
            image: 'water',
        },
    ];

    const data = [
        { id: '1', name: 'Temperature', values: sensorData.TEMP.TEMPERATURE, suffix: '°C' },
        { id: '2', name: 'Soil Moisture', values: sensorData.SOIL.SOIL, suffix: '%' },
        { id: '3', name: 'Humidity', values: sensorData.HUMIDITY.HUMIDITY, suffix: '%' },
        { id: '4', name: 'Rainfall Intensity', values: sensorData.RAIN.RAIN },
    ];


    return (
        <SafeAreaProvider>
            <Appbar.Header style={roomStyle.barHeader}>
                <Appbar.Content
                    title="DASHBOARD"
                    color="#371B58"
                    titleStyle={{ fontFamily: 'FiraSans-Medium' }}
                />
            </Appbar.Header>
            <ScrollView contentContainerStyle={roomStyle.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={{ padding: 10 }}>
                    {user ? (
                        <Text style={roomStyle.greeting}>
                            {`${greeting}, ${user && user.displayName || 'Guest'}`} {icon}
                        </Text>
                    ) : null}
                    <Text style={roomStyle.headerText}>What will we manage today?</Text>
                    <Card style={roomStyle.card} mode="outlined">
                        <Card.Content>
                            <DateTime current={data.current} />
                        </Card.Content>
                    </Card>

                    <View style={roomStyle.subContent}>
                        <Text style={roomStyle.subContentText}>Dashboard</Text>
                        <View style={roomStyle.horizontalLine} />
                    </View>

                    <Card style={roomStyle.card} mode="outlined">
                        <Card.Content style={roomStyle.cardContent}>
                            <Icon style={roomStyle.itemIcon} name="lightning-bolt" />
                            <View style={roomStyle.cardText}>
                                <Title style={roomStyle.itemValue}> {sensorData.CURRENT.ENERGY} kWh</Title>
                                <Title style={roomStyle.itemText}>Energy Consumption</Title>
                            </View>
                        </Card.Content>
                    </Card>

                    <View style={roomStyle.columnContainer}>
                        <View style={roomStyle.rowContainer}>
                            <Card style={roomStyle.card} mode="outlined">
                                <Card.Content style={roomStyle.cardContent}>
                                    <View style={roomStyle.cardText}>
                                        <Title style={roomStyle.itemValue}>{sensorData.CURRENT.CURRENT} A</Title>
                                        <Title style={roomStyle.itemText}>Ampere</Title>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>

                        <View style={roomStyle.rowContainer}>
                            <Card style={roomStyle.card} mode="outlined">
                                <Card.Content style={roomStyle.cardContent}>
                                    <View style={roomStyle.cardText}>
                                        <Title style={roomStyle.itemValue}>{sensorData.CURRENT.POWER} W</Title>
                                        <Title style={roomStyle.itemText}>Power</Title>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>
                    </View>



                    {data.map((item, index) => {
                        return index % 2 === 0 ? (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                key={item.id}>
                                <View style={roomStyle.FlatlistDashboard}>
                                    <CircularProgress
                                        value={item.values}
                                        radius={60}
                                        title={item.name}
                                        duration={100}
                                        rotation={360}
                                        activeStrokeWidth={7}
                                        inActiveStrokeWidth={7}
                                        activeStrokeColor={'#624F82'}
                                        progressValueColor={'#624F82'}
                                        valueSuffix={item.suffix}
                                        inActiveStrokeColor={'#9F73AB'}
                                        inActiveStrokeOpacity={0.5}
                                    />
                                </View>
                                {index + 1 < data.length && (
                                    <View style={roomStyle.FlatlistDashboard}>
                                        <Title style={roomStyle.itemValue}>{data[index + 1].values} {data[index + 1].suffix}</Title>
                                        <Title style={roomStyle.itemText}>{data[index + 1].name}</Title>
                                    </View>
                                )}
                            </View>
                        ) : null;
                    })}

                    <View>
                        <View style={roomStyle.subContent}>
                            <Text style={roomStyle.subContentText}>Home Environment</Text>
                            <View style={roomStyle.horizontalLine} />
                        </View>
                        <FlatList
                            style={roomStyle.listStyle}
                            keyExtractor={key => {
                                return key.index;
                            }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={names}
                            renderItem={({ item }) => {
                                return (
                                    <View style={roomStyle.FlatlistView}>
                                        <Ionicons style={roomStyle.itemIcon} name={item.image} />
                                        <View>
                                            <Title style={roomStyle.itemValue}>
                                                {item.values} {item.unit}
                                            </Title>
                                            {item.desc ? (
                                                <Text style={roomStyle.itemDescription}>{item.desc}</Text>
                                            ) : null}
                                            <Text style={roomStyle.itemText}>{item.name} </Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />

                        <View style={roomStyle.subContent}>
                            <Text style={roomStyle.subContentText}>Status</Text>
                            <View style={roomStyle.horizontalLine} />
                        </View>

                        <Card style={roomStyle.card} mode="outlined">
                            <Card.Content style={roomStyle.cardContent}>
                                <Icon
                                    style={roomStyle.itemIcon}
                                    name={sensorData.RAIN.RAIN > 700 ? 'weather-pouring' : 'weather-partly-cloudy'}
                                />
                                <View style={roomStyle.cardText}>
                                    <Title style={roomStyle.itemValue}>
                                        {sensorData.RAIN.RAIN > 700 ? (
                                            <Text>IT IS RAINING</Text>
                                        ) : (
                                            <Text>IT IS SUNNY</Text>
                                        )}
                                    </Title>
                                    <Title style={roomStyle.itemText}>Rain Status</Title>
                                </View>
                            </Card.Content>
                        </Card>

                        <Card style={roomStyle.card} mode="outlined">
                            <Card.Content style={roomStyle.cardContent}>
                                <Icon
                                    style={roomStyle.itemIcon}
                                    name={sensorData.FLAME.FLAME <= 100 ? 'fire-alert' : 'fire'}
                                />
                                <View style={roomStyle.cardText}>
                                    <Title style={roomStyle.itemValue}>
                                        {sensorData.FLAME.FLAME <= 100 ? (
                                            <Text>FIRE DETECTED</Text>
                                        ) : (
                                            <Text>SAFE</Text>
                                        )}
                                    </Title>
                                    <Title style={{ textAlign: 'left', ...roomStyle.itemText }}>FIRE Status</Title>
                                </View>
                            </Card.Content>
                        </Card>

                        <Card style={roomStyle.card} mode="outlined">
                            <Card.Content style={roomStyle.cardContent}>
                                <Icon
                                    style={roomStyle.itemIcon}
                                    name={sensorData.SOIL.SOIL >= 30 ? 'sprout' : 'sprout-outline'}
                                />
                                <View style={roomStyle.cardText}>
                                    <Title style={roomStyle.itemValue}>
                                        {sensorData.SOIL.SOIL > 60 ? (
                                            <Text>IN WATER</Text>
                                        ) : sensorData.SOIL.SOIL >= 20 && sensorData.SOIL.SOIL <= 50 ? (
                                            <Text>HUMID SOIL</Text>
                                        ) : (
                                            <Text>DRY SOIL</Text>
                                        )}
                                    </Title>
                                    <Title style={{ textAlign: 'left', ...roomStyle.itemText }}>Soil Status</Title>
                                </View>
                            </Card.Content>
                        </Card>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}
