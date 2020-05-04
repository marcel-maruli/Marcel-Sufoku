import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { getBoard, validate, submit, clearBoard, changeBoard, solve } from '../actions/board'

const screenWidth = Math.round(Dimensions.get("window").width - 30) / 9;
const screenHeight = Math.round(Dimensions.get("window").height - 30) / 9;
const fullHeight = Math.round(Dimensions.get("window").height);

export default function Board({ navigation }) {
  const dispatch = useDispatch()
  const name = useSelector(state => state.gameReducer.name)
  const board = useSelector((state) => state.boardReducer.board)
  // setBoard(boardBaseOnDiff)
  const value = useSelector((state) => state.boardReducer.value)
  console.log(value, 'CUMIIIIIIIIIIIIIIIIIiii');

  const validation = useSelector((state) => state.boardReducer.status)
  console.log(validation, 'masukgaksihhhhh?');

  const difficulties = useSelector(state => state.boardReducer.difficulty)
  console.log(difficulties, 'COBA COBA COBA');

  const onPressDifficulties = (difficult) => {
    dispatch(getBoard(difficult))
    navigation.navigate('Main')
  }

  return (
    <View>
      <View style={{}}>
        <Text style={{ fontSize: screenWidth / 2, textAlign: 'center' }} >Heyho {name},</Text>
        <Text style={{ fontSize: screenWidth / 2, textAlign: 'center' }} >Select Difficulties to play!</Text>
      </View>
      <View
        style={{
          flex: 0,
          marginBottom: 0,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: "row",
          marginTop: 250
        }}
      >
        <TouchableOpacity
          onPress={() => { onPressDifficulties('easy') }}
          style={styles.Button}
        ><Text>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => { onPressDifficulties('medium') }}
        >
          <Text>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => { onPressDifficulties('hard') }}
        ><Text>Hard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => { onPressDifficulties('random') }}
        ><Text>
            random
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 4,
    color: 'white',
    // width:
  }
});