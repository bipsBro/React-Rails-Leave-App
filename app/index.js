import React from 'react';
import {
  Button,
  Text,
  AsyncStorage,
  View
} from 'react-native';
import { BottomNavigation, RadioButton  } from 'react-native-material-ui';

import SignInScreen from './components/Login';

import LeaveForm from "./components/LeaveForm";
import LeaveList from "./components/LeaveList";
import Setting from "./components/Setting";

// class LeaveRoutes extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       'route': null,
//       'component': null
//     }
//     this.route(props);
//   }
//   route = (props) => {
//     this.setState({'route': props.route})
//     this.setState({'component': props.component})
//   }
// }
class AuthRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'auth':false,
      'leaves': null,
      'token' : null,
      'address' : null,
      'message' : 'Please Login To Use Appliction'
    }
    this._setUserToken();
  };
  _setUserToken = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({'token': token});
    AsyncStorage.getItem('address').then( (value) => this.setState({ 'address': value })).catch((error) => {
      this.setState({'auth': false});
      this.setState({'message': 'Please set local ip address from setting'});
    });
  }
  setToken(token){
    this.setState({'token': token});
  }
  login = (email, pass) => {
    fetch('http://192.168.1.87:3000/api/v1/session',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      })
    })
    .then((response) => response.json())
    .then( json => {
      status = json.status;
      data = json.data;
      error = json.error;
      this.setState({'status': status});
      if (status == "SUCCESS") {
        this.setState({'auth': true});
        token = data.authentication_token;
        this.signInAsync(token)
      }else{
        this.setState({'auth': false});
        this.setState({'error': error.message});
      }         
    })
    .catch((error) => {
        this.setState({'auth': false});
    });
  }
  signInAsync = async (token) => {
    await AsyncStorage.setItem('token', token);
    this.setState({token: token});
  }

  render() {
    return (
      <View>
        {this.state.token? <LeaveList /> : <SignInScreen login={this.login}/> }
      </View>
    )
  }
}

export default class HomeScreen extends React.Component {
  state = {
    'active' : 'home',
    'login' : false
  }
  login = () => {
    this.setState({'login': true})
  }
  logOut = () => {
    this.setState({'login': false})
  }
  userAction = (action) => {
    switch (action){
      case 'login':
        this.login();
        break;
      case 'logout':
        this.logOut()
        break;
      default:
        this.logOut();
        break;
    }
  }
  render() {
    return (
      <View>
        <BottomNavigation style={{left:0, right:0, bottom:0}} active={this.state.active} hidden={false} >
          <BottomNavigation.Action
              key="home"
              icon="home"
              label="Home"
              isActive={this.state.active === 'home' }
              onPress={() => this.setState({ active: 'home' })}
          />
          <BottomNavigation.Action
              key="settings"
              icon="settings"
              label="Settings"
              isActive={this.state.active === 'settings' }
              onPress={() => this.setState({ active: 'settings' })}
          />
        </BottomNavigation>
        <View>
          {this.state.active==="home"? <AuthRoutes action={this.userAction} auth={this.state.auth}/>: <Setting action={this.userAction} auth={this.state.auth}/>}
        </View>       
      </View>
    );
  }
}
