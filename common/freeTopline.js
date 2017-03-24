import React, {Component, propTypes} from 'react';
import {View, Text, Image, ListView, StyleSheet, TouchableOpacity} from 'react-native';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
const styles = StyleSheet.create({
  'freeTopLineList': {
    //backgroundColor: 'white',
    marginTop: 8,
  },
  'freeTopLineList-item': {
    //width: 390
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  'freeTopLineList-anwser': {
    marginTop: 14,
    marginBottom: 10,
    flexDirection: 'row'
  },
  
  'freeTopLineList-anwser-img': {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderStyle: 'solid',
    borderRadius: 20
  },
  'freeTopLineList-anwser-voice': {
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
  'freeTopLineList-anwser-number': {
    alignSelf: 'center',
    position: 'relative',
    left: 48
  },
  'anwser-editor': {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  'freeTopLineList-anwser-info': {
    flexDirection: 'row'
  }
});

function playVoice(url, data) {

  fetch('https://fd.zaih.com/api/v2/questions/90000035338507011128/listen',
       {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {"source": data.source ,"voice_id": data.voice_id}
       }).then((res) => {
           //console.info('res', res.json());
           return res.json();
       }).then((response) => {
        //console.info('response22222 response', response);
        ReactNativeAudioStreaming.play(
          response.url,
          {showIniOSMediaCenter: true, showInAndroidNotifications: true}
        );
       }).catch((err)=>{
          //console.log('error', err)
       });
}
function freeTopLineListRender(data) {
  //console.log('freeTopLineListRender', data.respondent);
  return (
    <View
      style={styles['freeTopLineList-item']}
    >
      <Text
        style={{
          color: '#999',
          fontSize: 15,
          fontWeight: 'bold',
        }}
      >
        {data.content}
      </Text>
      <Text
        style={{
          color: '#999',
          fontSize: 14,
        }}
      >
        {`${data.respondent.nickname} | ${data.respondent.title}`}
      </Text>
      <View
        style={
          styles['freeTopLineList-anwser-info']
        }
      >
        {
          data.respondent.is_verified ?
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
          style={styles['freeTopLineList-anwser-img']}
          source={{uri: data.respondent.avatar}}
        />
        <View
          style={
            styles['freeTopLineList-anwser-info']
          }
        >
          <Image
            style={styles['bubble-tail']}
            source={require('./img/bubbleTail.png')}
          />
          <TouchableOpacity
            onPress={
              () => {
                //console.log('1111111112222222222', data);
                if (data.action === 'free_recommend') {
                  const listenUrl = `http://fd.zaih.com/api/v2/questions/${data.question.id}/liste`;
                  //console.info('question data', data);
                  playVoice(listenUrl, {source: 'ios', voice_id: data.question.answer.voice_id});
                }
              }
            }
            >
            <View
              style={styles['freeTopLineList-anwser-voice']}
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
                '免费'
              </Text>
            </View>
          </TouchableOpacity>
          <Text>
            {data.answer.duration}
          </Text>
        </View>
      </View>
      <View
        style={{
          color: '#333',
          flexDirection: 'row'
        }}
      >
        <Text
          style={{
            color: '#3f3f3f',
            fontSize: 15
          }}
        >
          1小时前
        </Text>
        <View
          style={{
          }}
        >
          <Text>
            {data['listenings_count']}听过
          </Text>
          <Text>
            {data['listenings_count']}赞
          </Text>
        </View>
      </View>
    </View>
  );
}
class FreeTopLine extends Component {
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
    freeTopLineList: []
  }

  componentWillMount() {
    fetch('http://apis-fd.zaih.com/v1/albums/1034278293923455/questions?offset=0&limit=20',
         {
          method: 'get'
         }).then((res) => {
             //console.info('res', res.json());
             return res.json();
         }).then((response) => {
          //console.info('resssponse response', response);
          this.setState({freeTopLineList: this.state.ds.cloneWithRows(response)});
         });
  }
  render() {
    const { freeTopLineList = []} = this.state;
    if (freeTopLineList.length < 1) {
      return (
        <Text>
          暂无信息展示freeTopline
        </Text>
      );
    }
    //console.log('freeTopLineList', freeTopLineList);
    //const questionListItems = questionList.map(questionTemp);
    return (
      <View
       style={styles.freeTopLineList}
      >
        <ListView
          dataSource={freeTopLineList}
          renderRow={(rowData) => {
            return (freeTopLineListRender(rowData));
          }}
        />
      </View>
    )
  }
}
export default FreeTopLine;
