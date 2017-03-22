import React, {Component, propTypes} from 'react';
import {View, Text, Image, ListView, StyleSheet, TouchableOpacity} from 'react-native';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
const styles = StyleSheet.create({
  'questionList': {
    //backgroundColor: 'white',
    marginTop: 8,
  },
  'questionList-item': {
    //width: 390
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10
  },
  'questionList-anwser': {
    marginTop: 14,
    marginBottom: 10,
    flexDirection: 'row'
  },
  
  'questionList-anwser-img': {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderStyle: 'solid',
    borderRadius: 20
  },
  'questionList-anwser-voice': {
     width: 160,
     height: 40,
     borderRadius: 22,
     marginLeft: 16,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#1ccda6'
  },
  'bubble-tail': {
    width: 17,
    height: 24,
    position: 'relative',
    //marginLeft: -10
    left: 27,
    top: 16,
    zIndex: 2
  },
  'questionList-anwser-number': {
    alignSelf: 'center',
    position: 'relative',
    left: 48
  },
  'anwser-editor': {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

function playVoice(url, data) {

  fetch('http://fd.zaih.com/api/v2/questions/90000035338507011128/listen',
       {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {"source": data.source ,"voice_id": data.voice_id}
       }).then((res) => {
           return res.json();
       }).then((response) => {
        ReactNativeAudioStreaming.play(
          response.url,
          {showIniOSMediaCenter: true, showInAndroidNotifications: true}
        );
       }).catch((err)=>{
       });
}
function questionListRender(data) {
  return (
    <View
      style={styles['questionList-item']}
    >
      <Text>
        {data.question.content}
      </Text>
      <View
        style={styles['questionList-anwser']}
      >
        <View
        >
          {
            data.actor.is_verified ?
            <Image
              style={{
                position: 'absolute',
                width: 12,
                height: 12,
                top: 26,
                zIndex: 2,
                left: 26
              }}
              source={require('./img/verified.png')}
            /> : <Text></Text>
          }
          <Image
            style={styles['questionList-anwser-img']}
            source={{uri: data.actor.avatar}}
          >
          </Image>
        </View>
        <Image
          style={styles['bubble-tail']}
          source={require('./img/bubbleTail.png')}
        />
        <TouchableOpacity
            onPress={
              () => {
                if (data.action === 'free_recommend') {
                  const listenUrl = `http://fd.zaih.com/api/v2/questions/${data.question.id}/liste`;
                  playVoice(listenUrl, {source: 'ios', voice_id: data.question.answer.voice_id});
                }
              }
            }
          >
          <View
            style={styles['questionList-anwser-voice']}
          >
            <Image
              source={require('./img/wave3.png')}
              style={{
                width: 16,
                height: 16,
                fontSize: 16,
                marginRight: 20
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                marginRight: 24
              }}
            >
              {data.action === 'free_recommend' ? '限时免费' : '一元偷偷听'}
            </Text>
            
          </View>
        </TouchableOpacity>
        <View
          style={styles['questionList-anwser-number']}
        >
          <Text
            style={{
              fontSize: 15,
              color: '#999'
            }}
          >
            听过{data.question['listenings_count']}
          </Text>
        </View>
      </View>
      <View
        style={styles['anwser-editor']}
      >
        <View>
          <Text
            style={{
              color: '#3f3f3f',
              fontSize: 15
            }}
          >
            {data.actor.nickname}
          </Text>
          {
            data.action === 'recommend' ?
              <Image
                style={{
                  position: 'absolute',
                  width: 40,
                  height: 20,
                  left: 78,
                  top: 0
                }}
                source={require('./img/recommendTag.png')}
              /> : <Text></Text>
          }
          <Text
            style={{
              color: '#999',
              fontSize: 13
            }}
          >
            {data.actor.title}
          </Text>
        </View>
        <View
          style={{
            width: 48,
            height: 29,
            marginTop: 6,
            marginRight: 14,
          }}
        >
          <Image
            style={{
              width: 48,
              height: 29,
            }}
            source={require('./img/follow.png')}
          />
        </View>
      </View>
    </View>
  );
}
class QuestionList extends Component {
  static propTypes = {}
  static contextTypes = {}
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds,
      questionList: ds.cloneWithRows([]),
    };
  }
  state = {
    questionList: []
  }

  componentWillMount() {
    fetch('http://fd.zaih.com/feed_api/v1/self/timeline?page=1&per_page=20&is_refresh=true',
         {
          method: 'get'
         }).then((res) => {
             return res.json();
         }).then((response) => {
          this.setState({questionList: this.state.ds.cloneWithRows(response)});
         });
  }
  render() {
    const { questionList } = this.state;
    if (questionList.length < 1) {
      return (
        <Text>
          暂无信息展示
        </Text>
      );
    }
    return (
      <View
       style={styles.questionList}
      >
        <ListView
          dataSource={questionList}
          renderRow={(rowData) => {
            return (questionListRender(rowData));
          }}
        />
      </View>
    )
  }
}
export default QuestionList;
