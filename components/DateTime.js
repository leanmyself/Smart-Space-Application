import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { ActivityIndicator, Title } from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import { roomStyle } from '../styles/styles';

const DateTime = ({ current, lat = 14.676208, lon = 121.043861, timezone }) => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [weather, setWeather] = useState({});
    const [intervalId, setIntervalId] = useState(null);
    const [location, setLocation] = useState(null);

    const fetchWeatherData = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const useLatitude = latitude || lat;
                const useLongitude = longitude || lon;
                axios
                    .get(
                        `http://api.openweathermap.org/data/2.5/weather?lat=${useLatitude}&lon=${useLongitude}&units=metric&appid=938c2abbcb7d305db57ac648aa250a36`,
                    )
                    .then(response => {
                        setWeather(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            error => {
                console.error(error);
            },
            { enableHighAccuracy: false, timeout: 2000, maximumAge: 3600000 },
        );
    };

    useEffect(() => {
        const updateCurrentTime = () => {
            const currentTime = new Date();
            const month = currentTime.getMonth();
            const date = currentTime.getDate();
            const day = currentTime.getDay();
            const hour = currentTime.getHours();
            const hoursIn12HrFormat = hour === 0 ? 12 : hour >= 13 ? hour % 12 : hour;
            const minutes = currentTime.getMinutes();
            const ampm = hour >= 12 ? 'PM' : 'AM';

            setTime(
                (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) +
                ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm
            );

            setDate(days[day] + ', ' + months[month] + ' ' + date);
        };

        // Fetch initial weather data
        fetchWeatherData();

        // Update the current time every second
        const intervalId = setInterval(updateCurrentTime, 1000);

        setIntervalId(intervalId);

        return () => clearInterval(intervalId); // Clean up the interval on unmount
    }, []);


    return (
        <View style={{ flex: 1 }}>
            {Object.keys(weather).length !== 0 ? (
                <>
                    <View style={roomStyle.containerDate}>
                        <View>
                            <Text style={roomStyle.cityName}>
                                {weather.name}, {weather.sys.country}
                            </Text>
                            <Text style={roomStyle.time}>{time}</Text>
                            <Text style={roomStyle.date}>{date}</Text>
                        </View>
                        <View>
                            <Image
                                source={{
                                    uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
                                }}
                                style={roomStyle.weatherIcon}></Image>
                            <Text style={roomStyle.weatherDescription}>
                                {weather.weather[0].description}
                            </Text>
                        </View>
                    </View>
                    <View style={roomStyle.subContent}>
                        <Text style={roomStyle.headingText}>Current Weather</Text>
                        <View style={roomStyle.horizontalLine} />
                    </View>
                    <View style={roomStyle.containerWeather}>
                        <View>
                            <Feather
                                name="thermometer"
                                style={roomStyle.icon} />
                            <Text style={roomStyle.iconDescription}>{weather.main.temp} °C</Text>
                        </View>
                        <View>
                            <Feather name="wind" style={roomStyle.icon} />
                            <Text style={roomStyle.iconDescription}>
                                {' '}
                                {weather.wind.speed} m/s
                            </Text>
                        </View>
                        <View>
                            <Feather name="cloud" style={roomStyle.icon} />
                            <Text style={roomStyle.iconDescription}>
                                {' '}
                                {weather.clouds.all} %
                            </Text>
                        </View>
                        <View>
                            <Feather name="droplet" style={roomStyle.icon} />
                            <Text style={roomStyle.iconDescription}>
                                {' '}
                                {weather.main.humidity} %
                            </Text>
                        </View>
                    </View>
                </>
            ) : (
                <ContentLoader
                    speed={2}
                    width={300}
                    height={84}
                    viewBox="0 0 340 84"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"

                >
                    <Rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
                    <Rect x="76" y="0" rx="3" ry="3" width="140" height="11" />
                    <Rect x="127" y="48" rx="3" ry="3" width="53" height="11" />
                    <Rect x="187" y="48" rx="3" ry="3" width="72" height="11" />
                    <Rect x="18" y="48" rx="3" ry="3" width="100" height="11" />
                    <Rect x="0" y="71" rx="3" ry="3" width="37" height="11" />
                    <Rect x="18" y="23" rx="3" ry="3" width="140" height="11" />
                    <Rect x="166" y="23" rx="3" ry="3" width="173" height="11" />
                </ContentLoader>
            )}
        </View>
    );
};

export default DateTime;
