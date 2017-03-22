/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PanResponder,
  LayoutAnimation,
  TouchableOpacity,
  Navigator
} from 'react-native';
//var styles = require('./Dashboard.css');
import HeaderNav from './headerNav.js';
import LoginPage from './loginPage';
import Footerbar from './footerbar';
import Main from './main';
import {navigation} from 'react-navigation';
const styles = {};
let a = 0;
class HomePage extends Component {
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
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: ()=> true,
      onPanResponderGrant: ()=>{
        this._top = this.state.top
        this._left = this.state.left
        this.setState({bg: 'red'})
      },
      onPanResponderMove: (evt,gs)=>{
        if (gs.dx < 0 && a === 0) {
          a++;
          const {navigate} = this.props.navigation;
          navigate('SpeechesAll');
          /*navigator.push({
              name: 'loginPageComponent',
              component: LoginPage,
              //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
              params: {
                  id: 'loginPageComponent'
              },
              sceneConfig: Navigator.SceneConfigs.FloatFromRight
          });*/

        }
        setTimeout(() => {
          a = 0;
        }, 1000);
        console.log(gs.dx+' '+gs.dy)
      },
      onPanResponderRelease: (evt,gs)=>{
        this.setState({
          bg: 'white',
          top: this._top+gs.dy,
          left: this._left+gs.dx
      })}
    });
  }
  render() {
    console.info('this.props.navigation', this.props.navigation);
    return (
      <View
        {...this._panResponder.panHandlers}
        style={{
          flex: 1,
          flexDirection: 'column',
          //height: 100,//100vh
          //marginTop: 0,
          justifyContent: 'center'
        }}
      >
        <HeaderNav
          navigation={this.props.navigation}
        />
        <ScrollView>
          <Main
            navigation={this.props.navigation}
          />
        </ScrollView>
         <Footerbar/>
      </View>
    );
  }
}
export default HomePage;

