import React, {Component, propTypes} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
var Dimensions = require('Dimensions');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const fd_Code = {
  fd101: '制作中'
}
class StatusPage extends Component {
  static propTypes = {}
  static contextTypes = {}
  state={
    fd_code: 'fd101',
    circualAni: new Animated.Value(0)
  }
  componentDidMount() {
    Animated.timing(this.state.circualAni, {toValue: '-145deg'}).start;
  }
  render() {
    return (
      <View
        style={{
          width: width, height: height,
          alignItems: 'center'
        }}
      >
        <Text
          style={{marginTop: 60, fontSize: 15, color: '#3f3f3f'}}
        >
          制作中{'fd_code'['fd101']}
        </Text>
         <Animated.View
           style={{
              width: 44,
              height: 44,
              alignItems: 'center',
              marginRight: 15,
              //borderWidth: 2,
              borderColor: '#333',
              borderRadius: 22,
              borderTopWidth: 2,
              borderTopColor: 'red',
              borderTopStyle: 'solid',
              borderRightWidth: 2,
              borderRightColor: 'red',
              borderRightStyle: 'solid',
              transform: [{"rotate": '10'}]
            }}
          >
          </Animated.View>
      </View>
    )
  }
}
export default StatusPage;
