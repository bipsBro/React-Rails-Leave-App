import React from 'react';
import {
  AsyncStorage,
  View,
  TextInput
} from 'react-native';
import { Button } from 'react-native-material-ui';

export default class HomeScreen extends React.Component {
	state = {
		'address' : ''
	}
	componentDidMount(){
      AsyncStorage.getItem('address').then( (value) => this.setState({ 'address': value }))
   	}
	setAddress(address){
		AsyncStorage.setItem('address', this.state.address);
	}
	render() {
		return (
			<View>
				{/*<TextInput
					value = {this.state.address}
					underlineColorAndroid = "transparent"
					placeholder = "Domain address"
					placeholderTextColor = "#9a73ef"
					autoCapitalize = "none"
					onChangeText = {(address)=>this.setState({address})}/>
				<Button raised primary text="save" onPress={() => this.setAddress()}/>*/}
				<Button style={{margin:50}} raised primary text="Sign Out" onPress={() => this._signOutAsync()}/>
			</View>
		);
	}
	_signOutAsync = async () => {
	    await AsyncStorage.clear();
	};
}