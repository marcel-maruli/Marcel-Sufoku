import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';
import { getName } from '../actions/board'

export default ({ navigation }) => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const handleButton = () => {
    dispatch(getName(name))
    navigation.navigate('DifficultiesPage')

  }
  return (
    <>
      <View style={{ marginTop: "20%" }}>
        <Text style={{ textAlign: "center", marginBottom: "10%", fontSize: 20, fontWeight: "bold" }}>Inser Your Name!</Text>
        <TextInput onChange={(e) => setName(e.target.value)} style={{ textAlign: "center", fontSize: 20, padding: "2%", marginBottom: "10%", borderColor: "black", borderWidth: 1, borderRadius: 10, marginHorizontal: "20%" }} />
        <View style={{ paddingHorizontal: "20%" }}>
          <Button onPress={handleButton} title="MASUK" style={{ borderRadius: 50 }} />
        </View>
      </View>
    </>
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
