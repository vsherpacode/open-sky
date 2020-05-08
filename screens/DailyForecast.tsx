import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { DailyWeatherData } from '../data/IWeatherApi';


interface IDailyForecastProps {
  data: DailyWeatherData[]
}

export default function DailyForecast(props : IDailyForecastProps) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.hourlyContainer}>
          {props.data.map((data, index) => {
            return (
                <View style={styles.hourlyItemContainer} key={index}>
                  <Text style={styles.timeText}>{data.date}</Text>
                  <Text style={styles.descriptionText}>{data.description}</Text>
                  <Text style={styles.tempText}>{data.lowTemp}&deg; to {data.highTemp}&deg;</Text>
                </View>  
              );
            })
          }
        </View>
      </ScrollView>
    </View>
    
  );
};
const PADDING_SIZE = 10;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hourlyContainer: {
    marginRight: 10,
    marginLeft: 10,
  },
  hourlyItemContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingRight: PADDING_SIZE,
    paddingLeft: PADDING_SIZE,
    paddingTop: PADDING_SIZE,
    paddingBottom: PADDING_SIZE,
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  timeText: {
    fontSize: 18,
    flexGrow: 0,
    flexBasis: 100
  },
  tempText: {
    fontSize: 18
  },
  descriptionText: {
    fontSize: 14,
    textAlign: 'left',
    flexBasis: 100
  },
  next24Text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15
  }
});