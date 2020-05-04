import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Button, TouchableOpacity, FlatList, TextInput, Text } from 'react-native';
import { getName } from '../actions/board'

export default ({ navigation }) => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const handleButton = () => {
    dispatch(getName(name))
    navigation.navigate('Entry')

  }
  return (
    <>
      <View style={{ marginTop: "20%" }}>
        <Text style={{ textAlign: "center", marginBottom: "10%", fontSize: 20, fontWeight: "bold" }}>CONGRATULATIONS!</Text>
        <View style={{ paddingHorizontal: "20%" }}>
          <TouchableOpacity onPress={handleButton} title="MASUK" style={styles.Button}>
            <Text>Kembali Bermain?</Text>
          </TouchableOpacity>
          <FlatList></FlatList>
        </View>
      </View>
    </>
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
