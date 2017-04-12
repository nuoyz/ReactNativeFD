import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  PanResponder,
  AsyncStorage
} from 'react-native';
import HeaderNav from './headerNav.js';
//import Footer from './footer';
import Main from './main.js';
import HomePage from './homePage.js';
let b = 0;
const styles = StyleSheet.create({
  left: {
    flexDirection: 'row',
    marginLeft: 11,
  },
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
    flex: 1,
    height: 140,
    paddingRight: 10,
    paddingLeft: 10,
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
    height: 52,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderStyle: 'solid',
    paddingLeft: 8,
    paddingRight: 8,
    borderBottomWidth: 0.5,
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
    color: 'black',
    marginLeft: 10
  },
  userHeader: {
    justifyContent: 'flex-start'
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20
  },
  userHeaderH3: {
    fontSize: 13,
    color: 'gray'
  },
  userHeaderH4: {
    fontSize: 15,
    color: 'red'
  },
  userHeaderH5: {
    marginTop: 4,
    fontSize: 13,
    color: 'gray'
  },
});

class LoginPage extends Component {
  static navigationOptions = {
       header : {
          title: '555',
          visible: false
        }
      };
  static propTypes = {
    params: PropTypes.object
  };
  static contextTypes = {
    //store: PropTypes.object.isRequired
  };
  state = {
    modalVs: false,
  }
  componentWillMount() {
    const { params = {} } = this.props.navigation.state;
    let access_token;
    if (params.split) {//isObject
      access_token = (eval(params)['access_token']);
    } else {
      const loginInfo = AsyncStorage.getItem('loginInfo');
      if (loginInfo) {
        access_token = (eval(params)['access_token']);
      }
    }
    
    //const params = {};
    console.info('params params', access_token);
    //const test = eval(params);
    fetch('https://apis-fd.zaih.com/v1/accounts/self',
     {
      method: 'get',
      headers:{
        'Authorization': `Bearer ${access_token}`
      }
     })
      .then((res) => {
         return res.json();//可能会报错 报错则以 res.text 替代
       })
      .then((response) => {
        if (response) {
          console.log('eeeeselfinfo', response);
          this.setState({selfInfo: response});
        }
      })
      .catch((error)=>{
         console.log('error', error);
      });
  }
  templLoginHader = (selfInfo) => {
    return (
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <Image
              source={{uri: `${selfInfo.avatar || 'https://medias.zaih.com/gdc37159wlw5nx9t9akek9w3wthddgta!avatar'}`}}
              style={styles.userAvatar}
            />
            <Text
              style={{
                //fontWeight: 600,
                marginLeft:8,
                fonStyle: 'bold',
                fontSize: 13,
                alignSelf: 'center'
              }}
            >
              {selfInfo.nickname}
            </Text>
          </View>
          <TouchableOpacity>
            <View
              style={{
                width: 80,
                height: 30,
                borderStyle: 'solid',
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 1,
                borderRadius: 16
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  lineHeight: 24,
                  textAlign: 'center',
                  verticalAligin: 'middle'
                }}
              >
                开通分答
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.userHeaderH3}>
          开通分答主页,邀请好友向你提问，回答后被他人偷听，可持续获得收入
        </Text>
        <Text style={styles.userHeaderH4}>
          {`总收入￥${selfInfo['questions_count']}  总收益￥${selfInfo['recourse_replies_count']}`}
        </Text>
        <Text style={styles.userHeaderH5}>
          收入90%归你，每夜结算，自动入库微信钱包
        </Text>
      </View>
    );
  }
  render() {
    const {navigate} = this.props.navigation;
    const {selfInfo = {}} = this.state;
    console.log('selfInfo', selfInfo);
    return (
      <View
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
            >{selfInfo.avatar ? this.templLoginHader(selfInfo) :
              (<View>
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
                  <TouchableOpacity
                    onPress={
                      ()=>{
                        navigate('LoginVerify');
                      }
                    }
                  >
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
                  </TouchableOpacity>
                </View>
              )}
            </View> 
            <View
              style={styles.user}
            >
              <View
                style={styles.userListStyle}
              >
                <View
                  style={styles.left}
                >
                  <Image //！！require 模块引入限制
                    style={{
                      width: 17,
                      height: 20,
                    }}
                    source={require('./img/fanta_ic_my_account.png')}
                  />
                  <Text
                    style={
                      styles.listTitle
                    }
                  >
                    我的分答主页
                  </Text>
                </View>
                <Text>
                  >
                </Text>
              </View>
              {selfInfo ? (
                <View
                  style={{
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
                  }}
                >
                  <View
                    style={styles.left}
                  >
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      source={require('./img/fanta_ic_my_account.png')}
                    />
                    <Text
                      style={
                        styles.listTitle
                      }
                    >
                      我的分币
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: 'red'
                    }}
                  >
                    {`${selfInfo.bounce || 1200} >`}
                  </Text>
                </View>
              ) : null}
              <View
                style={styles.userListStyle}
              >
                <View
                  style={styles.left}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    source={require('./img/fanta_ic_my_questions.png')}
                  />
                  <Text
                    style={
                      styles.listTitle
                    }
                  >
                    我问
                  </Text>
                </View>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <View
                  style={styles.left}
                >
                  <Image
                    style={{
                      width: 21,
                      height: 20,
                    }}
                    source={require('./img/fanta_ic_my_answers.png')}
                  />
                  <Text
                    style={
                      styles.listTitle
                    }
                  >
                    我答
                  </Text>
                </View>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <View
                  style={styles.left}
                >
                  <Image
                    style={{
                      width: 21,
                      height: 18,
                    }}
                    source={require('./img/ic_my_visited.png')}
                  />
                  <Text
                    style={
                      styles.listTitle
                    }
                  >
                    我听
                  </Text>
                </View>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <View
                  style={styles.left}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    source={require('./img/icon_followed_account_list_entrance.png')}
                  />
                  <Text
                    style={
                      styles.listTitle
                    }
                  >
                    我收听的人
                  </Text>
                </View>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <View
                  style={styles.left}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    source={require('./img/ic_search_button.png')}
                  />
                  <Text
                    style={
                      styles.listTitle
                    }
                  >
                    快问
                  </Text>
                </View>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <View
                  style={styles.left}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 19,
                    }}
                    source={require('./img/icon_my_xj.png')}
                  />
                  <Text
                    style={
                      styles.listTitle
                    }
                  >
                    我的小讲
                  </Text>
                </View>
              </View>
              <View
                style={styles.helpTitle}
              >
                <View
                  style={styles.left}
                >
                  <Image
                    style={{
                      width: 15,
                      height: 20,
                    }}
                    source={require('./img/icon_help.png')}
                  />
                  <Text
                    style={
                      styles.listTitle
                    }
                  >
                    帮助
                  </Text>
                </View>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <View
                  style={styles.left}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 18,
                    }}
                    source={require('./img/ic_settlement.png')}
                  />
                  <Text
                    style={
                      styles.listTitle
                    }
                  >
                    结算说明
                  </Text>
                </View>
                <Text>
                  >
                </Text>
              </View>
              <View
                style={styles.userListStyle}
              >
                <View
                  style={styles.left}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    source={require('./img/ic_info.png')}
                  />
                  <Text
                    style={
                      styles.listTitle
                    }
                  >
                    关于分达
                  </Text>
                </View>
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

