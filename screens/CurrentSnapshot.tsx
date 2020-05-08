import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DailyWeatherData, CurrentWeatherData } from '../data/IWeatherApi';

interface IWeatherSnapshot {
  currentWeather: CurrentWeatherData,
  todaysWeather: DailyWeatherData
}

export default function CurrentSnapshot(props : IWeatherSnapshot) {
  return (
    <View style={styles.dailyOverview}> 
      <Text style={styles.currentConditionsText}>{props.currentWeather.description}</Text> 
      <View style={styles.todaySnapshot}>
        <View style={styles.todayHighLow}>
          <Text style={styles.todayHighLowTempText}>
            {props.todaysWeather.lowTemp}&deg;
          </Text> 
          <Text style={styles.todayHighLowDescText}>Low</Text>
        </View>
        <View style={styles.currentTempOuterCircle}> 
          <View style={styles.currentTempInnerCircle}>
          <Text style={styles.currentTempText}>{props.currentWeather.temp}</Text>
          </View>
        </View>
        <View style={styles.todayHighLow}>
          <Text style={styles.todayHighLowTempText}>
            {props.todaysWeather.highTemp}&deg;
          </Text>
          <Text style={styles.todayHighLowDescText}>High</Text>
        </View>
      </View>
      <Text style={styles.feelsLike}>feels like {props.currentWeather.feelsLike}&deg;</Text>
    </View>
  );
}

const INNER_CIRCLE_DIMS = 112;
const OUTER_CIRCLE_DIMS = 124;
const styles = StyleSheet.create({
  currentTempOuterCircle: {
    backgroundColor: 'black',
    borderRadius: OUTER_CIRCLE_DIMS / 2,
    width: OUTER_CIRCLE_DIMS,
    height: OUTER_CIRCLE_DIMS,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  currentTempInnerCircle: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    borderColor: "white",
    borderWidth: 3,
    justifyContent: 'center',
    borderRadius: INNER_CIRCLE_DIMS / 2,
    width: INNER_CIRCLE_DIMS,
    height: INNER_CIRCLE_DIMS
  },
  currentConditionsText: {
    marginTop: 10,
    fontSize: 20,
    alignSelf: 'center'
  },
  feelsLike: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 10
  },
  currentTempText: {
    color: 'white',
    fontSize: 48,
  },
  todaySnapshot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 15
  },
  todayHighLow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  todayHighLowDescText: {
    fontSize: 16
  },
  todayHighLowTempText: {
    fontSize: 24,
    fontWeight: 'bold'
  }, 
  dailyOverview: {
    marginTop: 10
  }
});