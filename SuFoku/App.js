import React, { useEffect } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import Board from './src/components/board'
import Entry from './src/components/entryPage'
import Congrats from './src/components/congratulationPage'
import Difficulties from './src/components/DifficultiesPage'
import store from './src/store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Entry" component={Entry} />
          <Stack.Screen name="DifficultiesPage" component={Difficulties} />
          <Stack.Screen name="Main" component={Board} />
          <Stack.Screen name="Congratulation" component={Congrats} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: "row",
  },
  box: {
    borderColor: 'red',
    backgroundColor: '#fff',
    borderWidth: 1,
    // padding: 10,
    width: 40,
    height: 40
  },
  col1: {
    flex: 0,
    flexDirection: "column",
    // margin: 0,
    borderStyle: "solid",
    alignItems: 'center',
    justifyContent: 'flex-start',
    // alignContent: "stretch"
  },
  col: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center"
  }
});
