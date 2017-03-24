import React, {Component, propTypes} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
const styles = {};

class Footer extends Component {
  static propTypes = {}
  static contextTypes = {}
  render() {
    return (
      <View
        style={{
          height: '8%',
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
       {['首页', '快问', '找人', '我的'].map((item, index)=>{
         return (
          <TouchableOpacity
            key={`footbar-${index}`}
            onPress={()=>{
              //console.log('item', item);
            }}
          >
            <Text>
              {item}
            </Text>
          </TouchableOpacity>
        );
       })}
      </View>
    )
  }
}
export default Footer;
