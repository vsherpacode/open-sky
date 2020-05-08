import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import ClimacellWeatherApi from '../data/ClimacellWeatherApi';
import { API_TOKEN } from '../data/Secret';
import CurrentSnapshot from './CurrentSnapshot';
import HourlyForecast from './HourlyForecast';

export default function DailyScreen() {
  const api = new ClimacellWeatherApi(API_TOKEN);
  const [data, setData] = useState({
    currentWeather: { temp: 0, feelsLike: 0, description: '' },
    todaysWeather: { lowTemp: 0, highTemp: 0, date: '' },
    next24HourData: []
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position : any) => {
      const { latitude, longitude } = position.coords;
      return resolveApiData(latitude, longitude);
    }, 
    (error) => {
      Alert.alert(error.message)
    }, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 1000
    });
  }, []);

  const resolveApiData = (lat : number, lon: number) => {
    return Promise.all([
      api.getCurrentWeather(lat, lon),
      api.getTodaysWeather(lat, lon),
      api.getNext24HourData(lat, lon)
    ]).then(([currentWeather, todaysWeather, next24HourData]) => {
      setData({ currentWeather, todaysWeather, next24HourData }) 
    });
  }; 
 
  return (
    <View style={styles.container}>
      <CurrentSnapshot currentWeather={data.currentWeather}
                       todaysWeather={data.todaysWeather} />
      <HourlyForecast data={data.next24HourData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  }
});