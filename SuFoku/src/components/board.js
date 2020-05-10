import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, TouchableOpacity, TextInput, Text, Dimensions } from 'react-native';
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
  const onPressValdate = (value) => {
    dispatch(submit(value))
  }
  const onPressSolve = value => {
    dispatch(solve(value))
  }

  const validation = useSelector((state) => state.boardReducer.status)
  const [validated, setValidation] = useState('')

  const difficulties = useSelector(state => state.boardReducer.difficulty)

  const onPressFinish = () => {
    navigation.navigate('Congratulation')
    dispatch(validate('unsolve'))
  }

  const onPressSurrender = () => {
    dispatch(validate('unsolve'))
    navigation.navigate('Entry')
  }

  const onchangeValue = (text, coordinate) => {
    console.log(text);
    const nums = '123456789';

    switch (text) {
      case ' ':
        alert('Please enter a number between 1-9!');
        break;

      case '0':
        alert(`You can't enter 0 or zero!`);
        break;

      default:
        if (text.length > 1) {
          alert('Please enter a number between 1-9!');
        } else if (!nums.includes(text)) {
          alert('Please enter number type only!');
        } else {
          const boardToChange = [...board];
          const valueToChange = [...value];
          valueToChange[coordinate[0]][coordinate[1]] = Number(text)
          boardToChange[coordinate[0]][coordinate[1]].val = text;
          dispatch(changeBoard(boardToChange, valueToChange));
        }
        break;
    }
  }
  useEffect(() => {
    setValidation(validation)
  }, [validated])
  return (
    <View>
      <>
        <View style={styles.container} >
          {
            board.length > 0 ?
              <View>
                <Text style={{ fontSize: screenWidth / 2 }}>{name}</Text>
                <Text style={{ fontSize: screenWidth / 2 }}>Difficulties: {difficulties}</Text>
                <Text style={{ fontSize: screenWidth / 2, textAlign: 'center' }}>{validation}</Text>
              </View>
              :
              <Text></Text>
          }
          <View style={{}}>
            {
              board.length > 0 &&
              board.map((el, i) => {
                return (
                  <View style={styles.bord} key={i}>
                    {el.map((col, j) => {
                      return (
                        col.val !== 0 ?
                          <View style={{ width: screenWidth }} key={j}>
                            <TextInput
                              key={j}
                              value={col.val}
                              onChangeText={text => onchangeValue(text, [i, j])}
                              maxLength={1}
                              style={styles.box}
                              editable={col.canChange}
                            />
                          </View>
                          :
                          <View style={{ width: screenWidth }} key={j}>
                            <TextInput
                              key={j}
                              value=""
                              onChangeText={text => onchangeValue(text, [i, j])}
                              maxLength={1}
                              style={styles.box}
                              editable={col.canChange}
                            />
                          </View>
                      )
                    })
                    }
                  </View>)
              })
            }
          </View>
        </ View>
        {
          board.length > 0 && validation !== 'solved' ?
            <View>
              <View
                style={{
                  flex: 0,
                  marginBottom: 0,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  flexDirection: "row",
                  marginTop: 20
                }}
              >
                <TouchableOpacity
                  onPress={() => { onPressValdate({ board: value }) }}
                >
                  <Text>
                    Validate
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { onPressSolve({ board: value }) }}
                >
                  <Text>
                    Solve
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { onPressSurrender() }}
                >
                  <Text>
                    Surrender
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            :
            <View>
              <View style={{
                flex: 0,
                marginBottom: 0,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginTop: 20
              }}>
                <TouchableOpacity
                  onPress={() => { onPressFinish() }}
                >
                  <Text>
                    Finish
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
        }
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPlayer: {
    flex: 0.4,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: "column",
  },
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
  },
  buttonGroup: {
    flex: 1,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: "row",
    marginTop: 20
  },
  box: {
    width: screenWidth,
    borderColor: 'black',
    height: screenWidth,
    fontSize: screenWidth / 1.5,
    borderWidth: 1,
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 4,
    color: 'white',
    // width:
  },
  bord: {
    borderColor: 'red',
    flexDirection: "row",
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
  },
  ButtonDiff: {
    marginHorizontal: 30,
    // marginLeft: 35
  }
});