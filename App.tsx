import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, Button, Text, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DailyScreen from './screens/DailyScreen';
import WeeklyScreen from './screens/WeeklyScreen';

const Stack = createStackNavigator();

export default function App() {
  const ref = React.useRef(null);
  return (
    <NavigationContainer ref={ref}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen 
          name="Today" 
          component={DailyScreen}
        />
        <Stack.Screen 
          name="Week"
          component={WeeklyScreen}
        />
      </Stack.Navigator>
      <View style={styles.buttons}>
      <TouchableHighlight
          onPress={() => ref.current?.navigate('Today')} 
          style={styles.button}
          accessibilityLabel="View the daily forecast"
        >
        <Text style={styles.buttonText}>Today</Text>
      </TouchableHighlight>
      <TouchableHighlight
          onPress={() => ref.current?.navigate('Week')}
          style={styles.button} 
          accessibilityLabel="View the weekly forecast"
        >
          <Text style={styles.buttonText}>Week</Text>
        </TouchableHighlight>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 40
  }, 
  button: {
    flex: 1,
    backgroundColor: 'blue',
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  }

});
