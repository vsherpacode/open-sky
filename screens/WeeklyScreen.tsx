import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import DailyForecast from './DailyForecast';
import ClimacellWeatherApi from '../data/ClimacellWeatherApi';
import { API_TOKEN } from '../data/Secret';

export default function WeeklyScreen() {
  const api = new ClimacellWeatherApi(API_TOKEN);

  const [data, setData] = useState({
    weekly: []
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

  const resolveApiData = (lat: number, lon: number) => {
    return api.getNextWeekData(lat, lon)
      .then((data) => {
        setData({ weekly: data });
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Next 7 days</Text>
      <DailyForecast data={data.weekly} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  headerText: {
    marginTop: 30,
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold'
  }  
});