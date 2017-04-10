import React, {Component, PropTypes} from 'react';
import {View, Text, Image ,StyleSheet, TouchableHighlight} from 'react-native';
import {observer, inject} from 'mobx-react';
let a = true;
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
const styles = StyleSheet.create({
  'headline-list': {
    flexDirection: 'column',
    height: 193,
    marginBottom: 10,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  'headline-item': {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    marginLeft: 8,
  },
  'headline-item-avatar': {
    width: 44,
    height: 44,
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 22
  },
  'headline-item-info': {
  },
  'headline-item-title': {
    fontWeight: '600',
    fontSize: 15,
    color: '#333'
  },
  'headline-item-name': {
    flexDirection: 'row',
    alignItems: 'center'
  },
  voicepause: {
    //borderColor: 'red',
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
                  source={require('./img/icon_pause_top_line.png')}
                  style={{
                    position: 'absolute',
                    top: 14,
                    left: 16,
                    zIndex: 2,
                    width: 13,
                    height: 15
                  }}
                /> :
                <Image
                  source={require('./img/icon_play_top_line.png')}
                  style={{
                    position: 'absolute',
                    top: 14,
                    left: 16,
                    zIndex: 2,
                    width: 13,
                    height: 15
                  }}
                />
              }
              <Image
                //style={styles['headline-item-avatar']}
                style={{
                  width: 44,
                  height: 44,
                  alignItems: 'center',
                  marginRight: 15,
                  borderWidth: 2,
                  //borderColor: '#f85f48',
                  borderRadius: 22,
                }}
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
            <Text style={{fontSize: 13, color: '#333'}}>{data.respondent.nickname} </Text>
            <Text stylr={{fontSize: 13, color: '#b3b3b3'}}>{data.respondent.title}</Text>
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
          <Text style={{color: 'black'}}>{data.respondent.nickname}</Text>
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
    //circualAni: new Animated.Value(0),  // Initial value for opacity: 0
  }
  componentWillMount() {
    const {dailyHLiStore} = this.props;
    dailyHLiStore.getdailyHLData();
  }
  componentDidMount() {
    //this.state.circualAni.setValue(1);
    //Animated.timing(this.state.circualAni, {toValue: -145}).start;
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
