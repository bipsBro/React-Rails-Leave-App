import React, { Component } from 'react';
import {
   AsyncStorage,
   Text,
   Picker,
   View,
   TextInput,
   StyleSheet,
   Dimensions,
   TouchableOpacity
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import { Checkbox, ActionButton } from 'react-native-material-ui';

class LeaveForm extends Component {
   state = {
      'token': '',
      'date': '',
      'leaveType': '',
      'reason': '',
      'response': '',
      'address': '',
   }
   componentDidMount(){
      var date = new Date();
      var today = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
      this.setState({'date': today});
      AsyncStorage.getItem('token').then( (value) => this.setState({ 'token': value }))
      AsyncStorage.getItem('address').then( (value) => this.setState({ 'address': value }))
   }
   getDate = () => {
      var date = new Date();
      return date.getFullYear().toString() +"-"+ date.getMonth().toString()+"-"+date.getMonth().toString();
   }
   setName = (value) => {
      AsyncStorage.setItem('token', value);
      this.setState({ 'token': value });
   }

   handleSubmit = () => {
      fetch('http://192.168.100.16:3000/api/v1/leaves',{
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authentication-token' : this.state.token
         },
         body: JSON.stringify({
            date: this.state.data,
            leavetype: this.state.leaveType,
            reason: this.state.reason
         })
      })
      .then((response) => response.json())
      .then( json => {
         status = json.status;
         data = json.data;
         message = json.message;
         if (status == "SUCCESS") {
            this.setState({'response': message})
            this.props.done()
         }else{
            this.setState({'hasError': true});
         }         
      })
       .catch((error) => {
           // TODO
       });
   }
   render() {
      return (
         <View style = {styles.container}>
            <DatePicker
               style={{width: 200}}
               date={this.state.date}
               mode="date"
               placeholder="select date"
               format="YYYY-MM-DD"
               // minDate="2016-05-01"
               // maxDate="2016-06-01"
               confirmBtnText="Confirm"
               cancelBtnText="Cancel"
               customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
               }}
               onDateChange={(date) => {this.setState({date: date})}}/>
            <Picker
               underlineColorAndroid = "transparent"
               placeholderTextColor = "#9a73ef"
               selectedValue={this.state.leaveType}
               style={styles.input}
               mode = "dropdown"
               prompt = "Select type of leave"
               onValueChange={(leaveType)=>this.setState({leaveType})}>
                  <Picker.Item style={styles.input} label="Selct Reason" value="" />
                  <Picker.Item style={styles.input} label="Casual" value="casual" />
                  <Picker.Item style={styles.input} label="Other" value="other" />
            </Picker>
            <TextInput
               style = {{margin: 15,borderColor: '#7a42f4',borderWidth: 1}}
               underlineColorAndroid = "transparent"
               placeholder = "Reason"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               multiline = {true}
               numberOfLines = {4}
               onChangeText = { (reason)=>this.setState({reason})}/>
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.handleSubmit()
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
           <ActionButton icon="cancel" onPress={ () => this.props.done() } />
         </View>
      )
   }
}
export default LeaveForm;
var {height} = Dimensions.get('window');
const viewHeight = height-60;
const styles = StyleSheet.create({
   container: {
      paddingTop: 23,
      height:viewHeight
   },
   input: {
      margin: 15,
      height: 40,
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
