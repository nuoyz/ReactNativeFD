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
  WebView,
  PanResponder,
  LayoutAnimation,
  TouchableOpacity,
  Navigator
} from 'react-native';
import SpeechesAll from './speechesAll.js';
import LoginPage from './loginPage.js';
import Main from './main';
import {navigation} from 'react-navigation';
import ScrollableTabView from  'react-native-scrollable-tab-view';//Header
import TabNavigator from 'react-native-tab-navigator';//Footer
const TabNavigatorItem = TabNavigator.Item;
var Dimensions = require('Dimensions');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
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
    selectedTab: 'home'
  }
  tempWebView = (config) => {
    return (
      <View
       style={{
         marginTop: -70,
         width,
         height,
       }}
      >
        <WebView
          source={{uri: config.uri}}
          style={{
            width,
            height,
          }}
        />
      </View>
    );
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        //{...this._panResponder.panHandlers}
        style={{
          flex: 1,
          flexDirection: 'column',
          //height: 100,//100vh
          //marginTop: 0,
          justifyContent: 'center'
        }}
      >
        <TabNavigator>
          <TabNavigator.Item
            titleStyle={{
              fontSize: 24
            }}
            selected={this.state.selectedTab === 'home'}
            title="首页"
            onPress={() => this.setState({ selectedTab: 'home' })}>
              <ScrollableTabView
                tabBarUnderlineStyle="red"
                tabBarBackgroundColor="#fff"
                tabBarActiveTextColor="#333"
                tabBarInactiveTextColor="gray"
                tabBarUnderlineStyle={{
                  borderBottomStyle: 'none'
                }}
              >
                <Main
                  navigation={navigation}
                />
                <SpeechesAll tabLabel="小讲"/>
              </ScrollableTabView>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'question'}
            titleStyle={{
              alignSelf: 'center',
              fontSize: 24
            }}
            title="快问"
            onPress={() => this.setState({ selectedTab: 'question' })}>
              <View
                style={{
                  width,
                  height,
                }}
              >
                {this.tempWebView({uri: 'http://fd.zaih.com/rewardboard'})}
              </View>
          </TabNavigator.Item>
          <TabNavigator.Item
            titleStyle={{
              fontSize: 24
            }}
            selected={this.state.selectedTab === 'find'}
            title="找人"//
            onPress={() => this.setState({ selectedTab: 'find' })}>
              {this.tempWebView({uri: 'http://fd.zaih.com/find'})}
          </TabNavigator.Item>
          <TabNavigator.Item
            titleStyle={{
              fontSize: 24
            }}
            selected={this.state.selectedTab === 'mine'}
            title="我的"
            onPress={() => this.setState({ selectedTab: 'mine' })}>
              <LoginPage
                navigation={this.props.navigation}
              />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}
export default HomePage;
/*
<ScrollableTabView
  tabBarUnderlineStyle="red"
  tabBarBackgroundColor="#fff"
  tabBarActiveTextColor="#333"
  tabBarInactiveTextColor="gray"
  tabBarUnderlineStyle={{
    borderBottom: 'none'
  }}
>
  <Main tabLabel="收听"
    navigation={this.props.navigation}
  />
  <SpeechesAll tabLabel="小讲"/>
</ScrollableTabView>
*/
