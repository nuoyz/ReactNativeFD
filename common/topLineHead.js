import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
const styles = {
  'headline-container': {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    //color: '#e5e5e5', isInvalid
    //fontSize: 15
  },
  'headline-body': {
    width: 390,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //fontSize: 14
  },
  'headline-header': {
    flexDirection: 'row',
    alignItems: 'center'
  },
  'text-daily': {
    //color: '#fff', isInvalid
    width: 92,
    height: 28,
    marginRight: 6,
    backgroundColor: '#f85f48',
    borderTopWidth: 1,
    borderTopLeftRadius: 15,
    alignItems: 'center'
  }
};

class TopLineHead extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }
  static contextTypes = {}
  render() {
    return (
      <View
        style={styles['headline-container']}
      >
        <View
          style={styles['headline-body']}
        >
          <View
            style={styles['headline-header']}
          >
            <View
              style={styles['text-daily']}
            >
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  lineHeight: 24
                }}
              >
                每日头条
              </Text>
            </View>
            <View>
              <Text>
                免费
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={()=>{
              const {navigate = {}} = this.props.navigation;
              navigate('Login');
            }}
          >
           <View>
            <Text>
              查看全部 >
            </Text>
           </View>
          </TouchableOpacity>
         </View>
      </View>
    )
  }
}
export default TopLineHead;
