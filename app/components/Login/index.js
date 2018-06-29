import React, { Component } from 'react'
import {
   AsyncStorage,
   View,
   Button,
   Text,
   TouchableOpacity,
   TextInput,
   StyleSheet
} from 'react-native'


class SignInScreen extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: ''
      }
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   
   render() {
      return (
            <View style = {styles.container}>
               <Text> {this.state.hasError? <Text style={{textAlignVertical: 'center', backgroundColor: '#7a42f4',textAlign:'center',color: 'white'}}>Invalid email or password</Text> : ''} </Text>
               <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "Email"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  keyboardType = "email-address"
                  onChangeText = {this.handleEmail}/>
               
               <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "Password"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  secureTextEntry
                  onChangeText = {this.handlePassword}/>
                  
               <TouchableOpacity
                  style = {styles.submitButton}
                  onPress = {
                     () => this.props.login(this.state.email, this.state.password)
                  }>
                  <Text style = {styles.submitButtonText}> Submit </Text>
               </TouchableOpacity>
               <View style = {{marginTop:50}}>
                  <Text>Test User</Text>
                  <Text>Email: bpnpanday313@gmail.com </Text>
                  <Text>password: 12345678</Text>
               </View>
            </View>
      );
   }
}

export default SignInScreen

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
});
