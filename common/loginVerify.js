import React, {Component, propTypes} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import superagent from 'superagent';
//import request from 'request';
const styles = StyleSheet.create({
  verify: {
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  'form-item': {
    
  }
});

class LoginVerify extends Component {
  static propTypes = {}
  static contextTypes = {}
  static navigationOptions = {
    title: '登录',
    header: {
      title: '登录'
    }
  };
  state = {
    code: '619542'
  }
  /*
<Button
  onPress={()=>{
    superagent
      .post('https://apis-fd-auth.zaih.com/v1/mobile/verification')
      .set({
        'client-channel': 'QDHome',
        'User-Agent':'android 1.9.81;19;M040;Meizu;',
        'Authorization': 'Basic YW5kcm9pZDplMzlhNjFiNzdjZGU0MGIxOGQ1YzNjYzZmYjQxZjU=',
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': 44,
        'Host': 'apis-fd-auth.zaih.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip'
      })
      .send({
        mobile: '15010845031',
        code_type:'login'
      })
      .end(function (err, sres) {
        if (err) {
          console.log('error', err);
        }
        console.log('sres', sres);
      });
  }}
  title='发送验证码'
/>
  *//*
  <View>
   <TextInput
     placeholder='手机号'
   />
   <Button
     title="发送验证码"
   />
  </View>*/
  /*
    <View
      style={{
        alignSelf: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1
      }}
    >
    </View>
  */
  handlePostMobile = () => {
    const {setMobile} = this.state;
    console.log('setMobile', setMobile);
    superagent
      .post('https://apis-fd-auth.zaih.com/v1/mobile/verification')
      .set({
        'client-channel': 'QDHome',
        'User-Agent':'android 1.9.81;19;M040;Meizu;',
        'Authorization': 'Basic YW5kcm9pZDplMzlhNjFiNzdjZGU0MGIxOGQ1YzNjYzZmYjQxZjU=',
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': 44,
        'Host': 'apis-fd-auth.zaih.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip'
      })
      .send({
        mobile: setMobile,
        code_type:'login'
      })
      .end(function (err, sres) {
        if (err) {
          //console.log('error', err);
        }
        //console.log('sres', sres);
      });
  }
  handlePostVerify = () => {
    const {navigate} = this.props.navigation;
    const code = this.state.code || 619542;
    console.log('code', code);
    //for test LoginPage willMount
    fetch("https://apis-fd-auth.zaih.com/v1/oauth/token", {
      method: "post",
      headers: {
        'client-channel': 'QDHome',
        'User-Agent':'android 1.9.81;19;M040;Meizu;',
        'client-source': 'android',
        'Authorization': 'Basic YW5kcm9pZDplMzlhNjFiNzdjZGU0MGIxOGQ1YzNjYzZmYjQxZjU=',
        'Content-Type': 'application/json;charset=utf-8',
        'Content-Length': 100,
        'Host': 'apis-fd-auth.zaih.com',
        'Connection': 'Keep-Alive',
        //'Accept-Encoding': 'gzip'
      },
      //body: 'auth_approach=mobile_code&grant_type=password&password=593405&username=15010845031'
      body: JSON.stringify({
        "auth_approach": "mobile_code",
        "grant_type": "password",
        "password": `${code}`,
        "username": "15010845031"
      })
    }).then(function(res) {
      console.log('resresres', res);
      return res.text();
    })
     .then((response)=>{
       console.log('response response', response);
       const loginInfo = response;
       this.setState({loginInfo, });//未解码
       AsyncStorage.setItem({loginInfo, });
       navigate('Login', {loginInfo, });
    })
     .catch((err)=>{
       console.log('err', err);
     });
  }
  handleInputMobile = (v) => {
    this.setState({setMobile: v});
  }
  handleInputVerify = (v) => {
    this.setState({code: v})
  }
  templWithLabel = () => {
    const configCol = [
      {
        lable: '手机号',
        button: '发送验证码',
        pressEvent: this.handlePostMobile,
        btnEvnet: this.handleInputMobile
      },
      {
        lable: '验证码',
        //pressEvent: this.handlePostVerify,
        btnEvnet: this.handleInputVerify
      }
    ];
    return configCol.map((config, i)=>(
      <View
        key={i}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderStyle: 'solid',
          borderColor: '#e5e5e5',
          borderBottomWidth: 1,
          paddingVertical: 4
        }}
      >
        <Text
          style={{
            //color: '#e5e5e5',
            textAlignVertical: 'center'
          }}
        >
          {config.lable}
        </Text>
        <TextInput
          style={{
            width: (config.button ? 200 : 200),
            //borderStyle: 'none'
          }}
          underlineColorAndroid ="transparent"
          onChangeText={
            configCol.pressEvent ? this.handleInputMobile : this.handleInputVerify
          }
        />
        {config.button ? (
          <View>
            <TouchableOpacity
              onPress={
                configCol.pressEvent ? this.handleInputMobile : ()=>{}
              }
            >
              <Text
                style={{
                  color: '#f85f48',
                  textAlignVertical: 'center'
                }}
              >
                {config.button}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    ));
  }
  render() {
    const {navigation} = this.props;
    //console.info('reder reder', navigation);
    return (
      <View
        style={styles.verify}
      >
        {this.templWithLabel()}
        <View>
          <Button
            color="white"
            //backgroundColor="#f85f48"
            color="#f85f48"
            onPress={
              this.handlePostVerify
            }
            title="登录"
          />
        </View>
      </View>
    )
  }
}
export default LoginVerify;
/*onSubmitEditing={
    (e) => {
      event.preventDefault()
      const nexts = 'http://fd.zaih.com/me';
      const code = this.state.code;
      console.log('code', code);
      superagent.post('http://fd.zaih.com/zhi/auth/oauth_authorized/mobile')      
        .set({
          'client-channel': 'QDHome',
          'User-Agent':'android 1.9.81;19;M040;Meizu;',
          'client-source': 'android',
          'Authorization': 'Basic YW5kcm9pZDplMzlhNjFiNzdjZGU0MGIxOGQ1YzNjYzZmYjQxZjU=',
          //'Content-Type': 'application/json; charset=UTF-8',
          'Content-Length': 44,
          'Host': 'apis-fd-auth.zaih.com',
          'Connection': 'Keep-Alive',
          'Accept-Encoding': 'gzip'
        })
        .send({
          "auth_approach": "mobile_code",
          "grant_type": "password",
          "password": code,
          "username": "15010845031"
        })
        .end(function(err, sres){
          if (err) {
            console.info('err err', err);
            return err;
          }
          console.info('sres', sres);
        });
    }
  }*/

/*
const code = this.state.code || 513485;
console.log('code', code);
fetch("https://apis-fd-auth.zaih.com/v1/oauth/token", {
  method: "post",
  headers: {
    'client-channel': 'QDHome',
    'User-Agent':'android 1.9.81;19;M040;Meizu;',
    'client-source': 'android',
    'Authorization': 'Basic YW5kcm9pZDplMzlhNjFiNzdjZGU0MGIxOGQ1YzNjYzZmYjQxZjU=',
    'Content-Type': 'application/json;charset=utf-8',
    'Content-Length': 100,
    'Host': 'apis-fd-auth.zaih.com',
    'Connection': 'Keep-Alive',
    //'Accept-Encoding': 'gzip'
  },
  //body: 'auth_approach=mobile_code&grant_type=password&password=593405&username=15010845031'
  body: JSON.stringify({
    "auth_approach": "mobile_code",
    "grant_type": "password",
    "password": `${code}`,
    "username": "15010845031"
  })
}).then(function(res) {
  console.log('resresres', res);
  return res.text()
})
 .then((response)=>{
   console.log('response response', response);
   this.setState({token: JSON.parse(response)});
})
 .catch((err)=>{
   console.log('err', err);
 });
*/
