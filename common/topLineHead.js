import React, {Component, PropTypes} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
const styles = {
  'headline-container': {
    height: 42,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    //color: '#e5e5e5', isInvalid
    //fontSize: 15
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e5e5e5'
  },
  'headline-body': {
    width: 331,
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
    width: 68,
    height: 22,
    marginRight: 6,
    backgroundColor: '#f85f48',
    borderTopWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
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
                  fontSize: 10,
                  textAlign: 'center',
                  lineHeight: 16,
                  color: 'white'
                }}
              >
                每日头条
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12
                }}
              >
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
           <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 13}}>
              查看全部 
            </Text>
            <Image
              style={{width: 8, height: 11, marginTop: 4, marginLeft: 2}}
              source={require('./img/icon_top_line_list_entrance.png')}
            />
           </View>
          </TouchableOpacity>
         </View>
      </View>
    )
  }
}
export default TopLineHead;
