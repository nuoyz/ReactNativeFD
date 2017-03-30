/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ScrollView,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
//var styles = require('./Dashboard.css');
import HomePage from './common/homePage';
import LoginPage from './common/loginPage';
import FreeTopLine from './common/freeTopline';
import SpeechesAll from './common/speechesAll';
import LoginVerify from './common/loginVerify';
const styles = {};

class AP extends Component {
  static propTypes = {
  };
  static navigationOptions = {
          header : {
             visible: false
           }
        };
  static contextTypes = {
    //store: PropTypes.object.isRequired
  };
  state = {
    modalVs: false,
    navigatorTest: false
  }
  render() {
    const defaultName = 'mainPage';
    const defaultComponent = HomePage;
    console.log('and', this.props.navigation);
    //const { navigate } = this.props.navigation;
    //const defaultComponent = LoginPage;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          //height: 100,//100vh
          //marginTop: 0,
          justifyContent: 'center'
        }}
      >{
        this.state.navigatorTest ?
        <SpeechesAll/> :
       <HomePage
         navigation={this.props.navigation}
       />
       }
      </View>
    );
  }
}
export default AP;

const App = StackNavigator({
  Home: { screen: AP },
  Login: {screen: LoginPage},
  SpeechesAll: {screen: SpeechesAll},
  LoginVerify: {screen: LoginVerify}
},{
  //headerMode: 'none',
  mode: 'card',
  //header : {visible: false}
 }
);
AppRegistry.registerComponent('AP', () => App);
