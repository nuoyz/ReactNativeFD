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
    this.refs.circularProgress.performLinearAnimation(100, 8000); // Will fill the progress bar linearly in 8 seconds
  }
  render() {
    return (
      <View
        style={{
          width: width, height: height,
          alignItems: 'center', overflow: 'hidden'
        }}
      >
        <Text
          style={{marginTop: 60, fontSize: 15, color: '#3f3f3f'}}
        >
          制作中{'fd_code'['fd101']}
        </Text>
         
      </View>
    )
  }
}
export default StatusPage;
