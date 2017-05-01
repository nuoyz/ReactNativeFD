import React, {Component, PropTypes} from 'react';
import {
  View, Text, Image, StyleSheet, TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import {observer, inject} from 'mobx-react';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
let a = true;
let timeControl;
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
  const {currentViewIndex, keyPlay} = this.state;
  return (
    <View
      key={`dailyHeadlinesList-${index}`}
      style={styles['headline-item']}
    >
      <View
        role="presentation"
      > 
         <TouchableHighlight
            underlayColor="white"
            onPress={
              () => {
                console.log('onClick, nClickk');
                if (keyPlay !== index) {
                  console.log('onClck');
                  ReactNativeAudioStreaming
                    .play(voiceUrl, {
                      showIniOSMediaCenter: true,
                      showInAndroidNotifications: true
                    });  
                  this.circleAnimation(`circularProgress-${index}`, 100, data.answer.duration*60*1000);//s ms
                  console.log('duration', (data.answer.duration)/60);
                  this.setState({keyPlay: index}, ()=>{
                   timeControl = setInterval(()=>{
                      const {progressPer: prevProgressPer} = this.state;
                      nowProgressPer = prevProgressPer + (10/(data.answer.duration*6));
                      console.log('nowProgressPer', nowProgressPer)
                      this.setState({progressPer: nowProgressPer || 0 });
                    }, 1000);
                  })
                } else {
                  ReactNativeAudioStreaming
                    .pause();
                  this.setState({keyPlay: -1}, ()=>{
                    clearInterval(timeControl);
                  })
                }
              }
            }
        >
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 23
            }}
          >
            {
              keyPlay === index ?
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
            <AnimatedCircularProgress
              ref={`circularProgress-${index}`}
              style={{
                position: 'absolute',
                top: 1,
                left: 1,
                zIndex: 3
              }}
              size={42}
              width={2}
              //fill={0}
              fill={(this.state)[`fill-${index}`] || 0}
              tintColor="#f85f48"
              backgroundColor="white"
            />
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
      <TouchableOpacity
        onPress={()=>this.handleVoicePlay(index, voiceUrl, data)}
      >
      <View
        style={styles['headline-item-info']}
      >
        <Text
          //style={styles['headline-item-title']}
          style={{
            fontWeight: '600',
            fontSize: 15,
            color: currentViewIndex === index ? '#f85f48' : '#333'
          }}
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
      </TouchableOpacity >
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
    /*if(this.refs.circularProgress) {
      this.refs.circularProgress.performLinearAnimation(100, 8000);
    }*/
  }
  handleVoicePlay(index, voiceUrl, data){
    console.log('i', index);
    if (!this.state.voiceStatePlay) {
      ReactNativeAudioStreaming
        .play(voiceUrl, {
          showIniOSMediaCenter: true,
          showInAndroidNotifications: true
        });
      this.circleAnimation(`circularProgress-${index}`, 100, (data.answer.duration)/60);//s ms
      this.setState({voiceStatePlay: true, currentViewIndex: index}, ()=>{
       timeControl = setInterval(()=>{
          this.setState({[`fill-${index}`]: this.state[`fill-${index}`]++});
        }, 1000);
      })
    } else {
      ReactNativeAudioStreaming
        .pause();
      this.setState({voiceStatePlay: true}, ()=>{
        clearInterval(timeControl);
      })
    }
  }
  circleAnimation(ref, p, d) {
    if(this.refs[ref]) {
      this.refs[ref].performLinearAnimation(p, d);
    }
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
