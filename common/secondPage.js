import React, {Component, propTypes} from 'react';
import {
  View, Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
const styles = StyleSheet.create({
});
class SecondPage extends Component {
  static propTypes = {}
  static contextTypes = {}
  render() {
    const {navigator} = this.props;
    return (
      <View>
        <Text>
          第二个页面 测试
        </Text>
      </View>
     )
  }
}
export default SecondPage;

