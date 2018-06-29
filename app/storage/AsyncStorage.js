import React, { Component } from 'react'
import { AsyncStorage, Text, View, TextInput, StyleSheet } from 'react-native'

class AsyncStorageExample extends Component {
   state = {
      'name': ''
   }
   componentDidMount = () ⇒ AsyncStorage.getItem('name').then((value) 
      ⇒ this.setState({ 'name': value }))

   setName = (value) ⇒ {
      AsyncStorage.setItem('name', value);
      this.setState({ 'name': value });
   }
   render() {
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.textInput} autoCapitalize = 'none' 
               onChangeText = {this.setName}/>
            <Text>
               {this.state.name}
            </Text>
         </View>
      )
   }
}
export default AsyncStorageExample
