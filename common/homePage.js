/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  Text, View, Image, ScrollView, WebView,
  StyleSheet, PanResponder, LayoutAnimation,
  TouchableOpacity, Navigator
} from 'react-native';
import SpeechesAll from './speechesAll.js';
import LoginPage from './loginPage.js';
import Main from './main';
import {navigation} from 'react-navigation';
import ScrollableTabView from  'react-native-scrollable-tab-view';//Header
import TabNavigator from 'react-native-tab-navigator';//Footer
//import Svg from 'react-native-svg';
const TabNavigatorItem = TabNavigator.Item;
var Dimensions = require('Dimensions');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  bottomNavContext: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '400',
    color: '#f85f48'
  }
});
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
         //marginTop: -70,
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
              fontSize: 24,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: 'black'
            }}
            selected={this.state.selectedTab === 'home'}
            //title="首页"
            renderSelectedIcon={() => (
              <View
                style={{
                  paddingTop: 14,
                  paddingBottom: 10,
                  marginTop: 40,
                }}
              >
                <Image
                  style={{
                   width: 20,
                   height: 19,
                   marginLeft: 2
                  }}
                  source={require('./img/icon_homepage_checked.png')}
                />
                <Text
                  style={styles.bottomNavContext}
                >
                  首页
                </Text>
              </View>
            )}
            renderIcon={()=>(
              <Image
                style={{
                  width: 23,
                  height: 21,
                  alignSelf: 'center',
                  resizeMode: 'stretch',
                  marginTop: 8
                }}
                source={require('./img/icon_homepage_unchecked.png')}
              />
            )}
            onPress={() => this.setState({ selectedTab: 'home' })}>
              <ScrollableTabView
                key='index'
                tabBarUnderlineStyle="red"
                tabBarBackgroundColor="#fff"
                tabBarActiveTextColor="#333"
                tabBarInactiveTextColor="gray"
                tabBarUnderlineStyle={{
                  //borderBottomStyle: 'none' //invalid 
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
            //title="快问"
            renderSelectedIcon={() => (
              <View
                style={{
                  paddingTop: 14,
                  paddingBottom: 10,
                  marginTop: 40,
                }}
              >
                <Image
                  style={{
                   width: 17,
                   height: 23,
                   marginLeft: 2
                  }}
                  source={require('./img/icon_reward_tab_press.png')}
                />
                <Text
                  style={styles.bottomNavContext}
                >
                  快问
                </Text>
              </View>
            )}
            renderIcon={()=>(
              <Image
                style={{
                  width: 17,
                  height: 21,
                  alignSelf: 'center',
                  resizeMode: 'stretch',
                  marginTop: 8
                }}
                source={require('./img/icon_reward_tab.png')}
              />
            )}
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
            //title="找人"
            renderSelectedIcon={() => (
              <View
                style={{
                  paddingTop: 14,
                  paddingBottom: 10,
                  marginTop: 40,
                }}
              >
                <Image
                  style={{
                   width: 20,
                   height: 20,
                   marginLeft: 2
                  }}
                  source={require('./img/icon_discovery_checked.png')}
                />
                <Text
                  style={styles.bottomNavContext}
                >
                  找人
                </Text>
              </View>
            )}
            renderIcon={ ()=>(
              <Image
                style={{
                  width: 20,
                  height: 20,
                  alignSelf: 'center',
                  resizeMode: 'stretch',
                  marginTop: 8
                }}
                source={require('./img/icon_discovery_unchecked.png')}
              />
            )}
            onPress={() => this.setState({ selectedTab: 'find' })}>
              {this.tempWebView({uri: 'http://fd.zaih.com/find'})}
          </TabNavigator.Item>
          <TabNavigator.Item
            titleStyle={{
              fontSize: 24
            }}
            selected={this.state.selectedTab === 'mine'}
            //title='我的'
            renderSelectedIcon={() => (
              <View
                style={{
                  paddingTop: 14,
                  paddingBottom: 10,
                  marginTop: 40,
                }}
              >
                <Image
                  style={{
                   width: 23,
                   height: 20,
                   marginLeft: 2
                  }}
                  source={require('./img/icon_me_checked.png')}
                />
                <Text
                  style={styles.bottomNavContext}
                >
                  我的
                </Text>
              </View>
            )}
            renderIcon={()=>(
              <Image
                style={{
                  width: 23,
                  height: 21,
                  alignSelf: 'center',
                  resizeMode: 'stretch',
                  marginTop: 8
                }}
                source={require('./img/icon_me_unchecked.png')}
              />
            )}
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
