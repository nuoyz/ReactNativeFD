import React, {Component, PropTypes} from 'react';
import {View, Text, Image ,StyleSheet, TouchableHighlight} from 'react-native';
import {observer, inject} from 'mobx-react';
let a = true;
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
const styles = StyleSheet.create({
  'headline-list': {
    backgroundColor: 'white',
    marginLeft: 8,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  'headline-item': {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#e5e5e5'
    //height: 40,
  },
  'headline-item-avatar': {
    width: 40,
    height: 40,
    alignItems: 'center',
    marginRight: 4,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    //borderStyle: 'solid',
    borderRadius: 20
  },
  'headline-item-info': {
  },
  'headline-item-title': {
    fontWeight: '600',
    fontSize: 14,
    color: '#333'
  },
  'headline-item-name': {
    //fontSize: 13,
    //color: '#b3b3b3'
  }
});
function dailyHeadlinesRender(data, index) {
  const voiceUrl = data.answer.voice;
  if (a) {//test voice
    a = false;
  }
  return (
      <View
        key={`dailyHeadlinesList-${index}`}
        style={styles['headline-item']}
      >
        <View
          role="presentation"
        > 
           <TouchableHighlight
              onPress={
                () => {
                  //console.log('duble click 666666666');
                  if (!this.state.voiceStatePlay) {
                    ReactNativeAudioStreaming
                      .play(voiceUrl, {
                        showIniOSMediaCenter: true,
                        showInAndroidNotifications: true
                      });
                    this.setState({voiceStatePlay: true})
                  } else {
                    ReactNativeAudioStreaming
                      .pause();
                    this.setState({voiceStatePlay: true})
                  }
                }
              }
          >
            <View>
            {
              this.state.voiceStatePlay ?
              <Image
                source={require('./img/voicepause.png')}
                style={{
                  position: 'absolute',
                  top: 14,
                  left: 12,
                  zIndex: 2,
                  width: 14,
                  height: 14
                }}
              /> :
              <Image
                source={require('./img/voiceplay.png')}
                style={{
                  position: 'absolute',
                  top: 14,
                  left: 12,
                  zIndex: 2,
                  width: 14,
                  height: 14
                }}
              />
            }
            <Image
              style={styles['headline-item-avatar']}
              source={{uri: data.respondent.avatar}}
            />
            </View>
          </TouchableHighlight>
        </View>
        <View
          style={styles['headline-item-info']}
        >
          <Text
            style={styles['headline-item-title']}
          >
            {data['short_title']}
          </Text>
          <View
            style={styles['headline-item-name']}
          >
            <Text>{data.respondent.nickname}</Text>
            <Text>{data.respondent.title}</Text>
          </View>
        </View>
      </View>
    )
  return (
    <View
      key={`dailyHeadlinesList-${index}`}
      style={styles['headline-item']}
    >
      <View
        role="presentation"
      > 
         <TouchableHighlight
            onPress={
              () => {
                //console.log('duble click 666666666');
                if (!this.state.voiceStatePlay) {
                  ReactNativeAudioStreaming
                    .play(voiceUrl, {
                      showIniOSMediaCenter: true,
                      showInAndroidNotifications: true
                    });
                  this.setState({voiceStatePlay: true})
                } else {
                  ReactNativeAudioStreaming
                    .pause();
                  this.setState({voiceStatePlay: true})
                }
              }
            }
        >
          {
            this.state.voiceStatePlay ?
            <Image
              source={require('./img/voicepause.png')}
              style={{
                position: 'absolute',
                top: 14,
                left: 12,
                zIndex: 2,
                width: 14,
                height: 14
              }}
            /> :
            <Image
              source={require('./img/voiceplay.png')}
              style={{
                position: 'absolute',
                top: 14,
                left: 12,
                zIndex: 2,
                width: 14,
                height: 14
              }}
            />
          }
          <Image
            style={styles['headline-item-avatar']}
            source={{uri: data.respondent.avatar}}
          />
        </TouchableHighlight>
      </View>
      <View
        style={styles['headline-item-info']}
      >
        <Text
          style={styles['headline-item-title']}
        >
          {data['short_title']}
        </Text>
        <View
          style={styles['headline-item-name']}
        >
          <Text>{data.respondent.nickname}</Text>
          <Text>{data.respondent.title}</Text>
        </View>
      </View>
    </View>
  )
}
@inject('dailyHLiStore')
@observer
class DailyHeadlinesList extends Component {
  static propTypes = {
    dailyHLiStore: PropTypes.object
  }
  static contextTypes = {}
  state = {
    voiceStatePlay: false,
  }
  componentWillMount() {
    const {dailyHLiStore} = this.props;
    dailyHLiStore.getdailyHLData();
  }
  render() {
    const {dailyHLiStore: {dailyHeadlinesList}} = this.props;
    if (!dailyHeadlinesList) {
      return (
        <Text>
           暂无头条信息
        </Text>
      )
    }
    const dailyHeadlinesItems = dailyHeadlinesList
      .map(dailyHeadlinesRender.bind(this));
    return (
      <View 
        style={styles['headline-list']}
      >
        {dailyHeadlinesItems}
      </View>
    )
  }
}
export default DailyHeadlinesList;
