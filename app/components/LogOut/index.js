import React from 'react';
import {
  AsyncStorage,
  View,
  TextInput
} from 'react-native';
import { Button } from 'react-native-material-ui';

export default class LogOut extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      'error' : false
	    }
  	}
	render() {
		return (
			<View>
				{this.state.error?<View>Their was an error!</View>: <View>Are you sure !***</View> }
				<Button style={{margin:50}} raised primary text="Sign Out" onPress={() => this._signOutAsync()}/>
			</View>
		);
	}
	_signOutAsync = async () => {
		try {
		    await AsyncStorage.clear();
		} catch (error) {
		    this.setState({'error':true})
		}
}
	};
}