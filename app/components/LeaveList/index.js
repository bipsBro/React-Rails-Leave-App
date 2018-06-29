
import React from 'react';
import {
  Button,
  ListView,
  Text,
  View,
  AsyncStorage,
  Dimensions
} from 'react-native';
import { Dialog, DialogDefaultActions, ListItem,ActionButton } from 'react-native-material-ui';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import LeaveForm from '../LeaveForm';

var {height, width} = Dimensions.get('window');

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'title': '',
      'Content' : {},
      'message' : '',
      'hasError' : '',
      'state': 'cancel'
    }
  };
  render() {
    return (
      <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Dialog style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Dialog.Title><Text>Hello world</Text></Dialog.Title>
          <Dialog.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <DialogDefaultActions
               actions={['cancel', 'ok']}
               onActionPress={(action) => {}}
            />
          </Dialog.Actions>
        </Dialog>
      </View>
    );
  }
}
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'leaves': false,
      'token' : '',
      'message' : '',
      'hasError' : '',
      'addNew': false
    }
    this._setUserToken();
  };
  _setUserToken = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({'token': token});
    fetch('http://192.168.100.16:3000/api/v1/leaves',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authentication-token' : this.state.token
      }
    })
    .then((response) => response.json())
    .then( json => {
      status = json.status;
      data = json.data;
      // message = json.message;
      if (status == "SUCCESS") {
        this.setState({'leaves': data})
      }else{
        this.setState({'hasError': true});
      }         
    })
    .catch((error) => {
        // TODO
    });
  }
  renderItem =(item) => (
    <ListItem 
      key ={ item.id }
      centerElement={{
        primaryText: item.reason?item.reason:"Not set",
        secondaryText: item.leavetype?item.leavetype:"Not Set",
      }}
      divider={true}>
    </ListItem>
  )
  done = () => {
    this.setState({'addNew':false})
  }
  renderLeaveList = () => {
    const { leaves } = this.state;
    const viewHeight = height-60;
    return (
      <View style={{height:viewHeight}}>
        { leaves && leaves.map( (data) => this.renderItem(data))}              
        <ActionButton icon="add" onPress={ () => this.setState({'addNew':true})} />
      </View>
    );
  }
  render() {
    
    const { leaves } = this.state;
    return (
      <View>
        {this.state.addNew ? <LeaveForm done={this.done}/> : this.renderLeaveList()}
      </View>
    );
  }
}
