import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PanResponder
} from 'react-native';
import HeaderNav from './headerNav.js';
//import Footer from './footer';
import Main from './main.js';
import HomePage from './homePage.js';
let b = 0;
const styles = StyleSheet.create({
  login: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  loginHeader: {
    justifyContent: 'center',
    height: 40,
    backgroundColor: 'white',
    borderColor: '#e5e5e5',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  loginPanel: {
    //flexDirection: 'row',
    /*flex: 2,
    flexGrow: 2,
    flexShrink: 2,*/
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 140,
    backgroundColor: 'white',
  },
  userPhoto: {
    width: 54,
    height: 54,
    justifyContent: 'center',
    borderRadius: 27,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    borderStyle: 'solid'
  },
  loginButton: {
    width: 58,
    height: 34,
    justifyContent: 'center',
    borderRadius: 16,
    borderColor: 'red',
    backgroundColor: 'red',
    borderWidth: 1,
  },
  user: {
    marginTop: 10,
    flex: 1,
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  userListStyle: {
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderStyle: 'solid',
    paddingLeft: 8,
    paddingRight: 8,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  helpTitle: {
    marginTop: 10,
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderStyle: 'solid',
    paddingLeft: 8,
    paddingRight: 8,
    paddingRight: 4,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listTitle: {
    
  }
});

class LoginPage extends Component {
  static navigationOptions = {
       header : {
          title: '555',
          visible: false
        }
      };
  static propTypes = {
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
        const { navigator } = this.props;
        if (gs.dx > 0 && b === 0) {
          b++;
          const {navigate} = this.props.navigation;
          navigate('Home');
          /*navigator.push({
              name: 'HomePageComponent',
              component: HomePage,
              //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
              params: {
                  id: 'HomePageComponent'
              },
              sceneConfig: Navigator.SceneConfigs.FloatFromLeft
          });*/
          setTimeout(() => {
            b = 0;
          }, 1000);
        }
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
    const {navigator} = this.props;
    return (
      <View
        {...this._panResponder.panHandlers}
        style={styles.login}
      >
        <View
          style={styles.loginHeader}
        >
          <Text
            style={{
              textAlign: 'center'
            }}
          >
            分答 - 付费语音问答
          </Text>
        </View>
        <View
          style={{
            flexGrow: 1,
            flex: 1
          }}
        >
          <ScrollView
            style={{
              flex: 1,
              borderColor: 'red',
              borderWidth: 1,
              borderStyle: 'solid'
            }}
          >
            <View
              style={styles.loginPanel}
            >
              <View
                style={styles.userPhoto}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white'
                  }}
                >
                  头像
                </Text>
              </View>
              <View
                style={styles.loginButton}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white'
                  }}
                >
                  登录
                </Text>
              </View>
            </View>
            <View
              style={styles.user}
            >
              <View
                style={styles.userListStyle}
              >
                <Text
                  style={
                    styles.listTitle
                  }
                >
                  我的分答主页
                </Text>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <Text
                  style={
                    styles.listTitle
                  }
                >
                  我问
                </Text>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <Text
                  style={
                    styles.listTitle
                  }
                >
                  我答
                </Text>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <Text
                  style={
                    styles.listTitle
                  }
                >
                  我听
                </Text>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <Text
                  style={
                    styles.listTitle
                  }
                >
                  我收听的人
                </Text>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <Text
                  style={
                    styles.listTitle
                  }
                >
                  快问
                </Text>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <Text>我的小讲</Text>
              </View>
              <View
                style={styles.helpTitle}
              >
                <Text
                >
                  帮助
                </Text>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <Text
                  style={
                    styles.listTitle
                  }
                >
                  结算说明
                </Text>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <Text
                  style={
                    styles.listTitle
                  }
                >
                  关于分达
                </Text>
                <Text>
                  >
                </Text>
              </View>
            </View>
          </ScrollView>
          </View>
      </View>
    );
  }
}
export default LoginPage;

