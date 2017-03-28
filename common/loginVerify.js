import React, {Component, propTypes} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import superagent from 'superagent';
//import request from 'request';
const styles = StyleSheet.create({
  'form-item': {
    
  }
});

class LoginVerify extends Component {
  static propTypes = {}
  static contextTypes = {}
  state = {
    code: '594304'
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
  templWithLabel = () => {
    return (
      <View >
        <Text></Text>
        <TextInput/>
      </View>
    );
  }
  render() {
    return (
      <View
        style={styles.verify}
      >
        <View>
          <TextInput
            placeholder="验证码"
            onChangeText={(code) => this.setState({code, })}
            
          />
          <Button
            onPress={()=>{
                const code = this.state.code || 513485;
                console.log('code', code);
                /*request
                  .post('https://apis-fd-auth.zaih.com/v1/oauth/token')
                  .headers({
                    'client-channel': 'QDHome',
                    'User-Agent':'android 1.9.81;19;M040;Meizu;',
                    'client-source': 'android',
                    'Authorization': 'Basic YW5kcm9pZDplMzlhNjFiNzdjZGU0MGIxOGQ1YzNjYzZmYjQxZjU=',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Content-Length': 100,
                    'Host': 'apis-fd-auth.zaih.com',
                    'Connection': 'Keep-Alive',
                    'Accept-Encoding': 'gzip'
                  })
                  .form({
                    auth_approach: 'mobile_code',
                    grant_type: 'password',
                    password: '593405',
                    username: '15010845031'
                  })
                  .on('response', (response)=>{
                    console.info('response', response);
                  })
                  .on('error', (err)=>{
                    console.log('err', err);
                  })*/
                  
                /*fetch("https://apis-fd-auth.zaih.com/v1/oauth/token", {
                  method: "post",
                  headers: {
                    'client-channel': 'QDHome',
                    'User-Agent':'android 1.9.81;19;M040;Meizu;',
                    'client-source': 'android',
                    'Authorization': 'Basic YW5kcm9pZDplMzlhNjFiNzdjZGU0MGIxOGQ1YzNjYzZmYjQxZjU=',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Content-Length': 100,
                    'Host': 'apis-fd-auth.zaih.com',
                    'Connection': 'Keep-Alive',
                    'Accept-Encoding': 'gzip'
                  },
                  body: 'auth_approach=mobile_code&grant_type=password&password=593405&username=15010845031'
                }).then(function(res) {
                  console.log('resresres', res);
                  return res.json()
                })
                 .then((response)=>{
                   console.log('response response', response);
                })
                 .catch((err)=>{
                   console.log('err', err);
                 });*/

                 /*
                superagent.post('https://apis-fd-auth.zaih.com/v1/oauth/token')   
                 .withCredentials()   
                  .set({
                    'client-channel': 'QDHome',
                    'User-Agent':'android 1.9.81;19;M040;Meizu;',
                    'client-source': 'android',
                    'Authorization': 'Basic YW5kcm9pZDplMzlhNjFiNzdjZGU0MGIxOGQ1YzNjYzZmYjQxZjU=',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Content-Length': 100,
                    'Host': 'apis-fd-auth.zaih.com',
                    'Connection': 'Keep-Alive',
                    'Accept-Encoding': 'gzip'
                  })
                  .send({
                    "auth_approach": "mobile_code",
                    "grant_type": "password",
                    "password": '867113',
                    "username": "15010845031"
                  })
                  .end(function(err, sres){
                    if (err) {
                      console.info('err err2222', err);
                      return;
                    }
                    console.info('sres222222', sres);
                    //console.info('sres222222', JSON.parse(sres));
                  });*/
              }
            }
            title="uyyyy"
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
