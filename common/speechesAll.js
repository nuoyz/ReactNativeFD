
import React, {Component, propTypes} from 'react';
import {View, Text, Image, ListView, StyleSheet, TouchableOpacity} from 'react-native';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
const styles = StyleSheet.create({
  'speechesList': {
    backgroundColor: 'white',
    marginTop: 20,
  },
  'speeches-item': {
    //width: 390
    flexDirection: 'row',
    //justifyContent: 'space-between',
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10
  },
  'questionList-anwser': {
    marginTop: 14,
    marginBottom: 10,
    flexDirection: 'row'
  },
  'speeches-item-avatar': {
    alignSelf: 'center',
    marginRight: 8
  },
  'speeches-avatar-img': {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  'speeches-item-contxt': {
    flex: 1
  }
});

function SpeechesItemRender(data) {
  //console.log('questionListRender', data);
  return (
    <View
      style={styles['speeches-item']}
    >
      <View
        style={styles['speeches-item-avatar']}
      >
        {
          data.respondent.is_verified ?
          <Image
            style={{
              position: 'absolute',
              width: 12,
              height: 12,
              top: 34,
              zIndex: 2,
              left: 28
            }}
            source={require('./img/verified.png')}
          /> : <Text></Text>
        }
        <Image
          style={styles['speeches-avatar-img']}
          source={{uri: data.respondent.avatar}}
        />
      </View>
      <View
        style={styles['speeches-item-contxt']}
      >
        {data.is_new ?
          <Image
            style={{
              position: 'absolute'
            }}
            source={{uri: data.respondent.avatar}}
          /> : <Text></Text>
        }
        <Text
          style={{
            color: '#3f3f3f',
            fontSize: 15,
            fontWeight: 'bold',
          }}
        >
          {data.title}
        </Text>
        <Text
          style={{
            color: '#999',
            fontSize: 14
          }}
        >
          {`${data.respondent.nickname} | ${data.respondent.title}`}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: 'white'
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: '#999'
            }}
          >
            {`${data.participants_count}人参加`}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#f85f48'
            }}
          >
            x小时前主讲回复
          </Text>
        </View>
      </View>
    </View>
  );
}
class SpeechesAll extends Component {
  static propTypes = {}
  static contextTypes = {}
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds,
      speechesList: ds.cloneWithRows([]),
    };
  }
  state = {
    speechesList: []
  }

  componentWillMount() {
    fetch('http://fd.zaih.com/speech_api/v1/speeches?page=1&per_page=20',
         {
          method: 'get'
         }).then((res) => {
             //console.info('res', res.json());
             return res.json();
         }).then((response) => {
          //console.info('responsess response', response);
          this.setState({speechesList: this.state.ds.cloneWithRows(response)});
         });
  }
  render() {
    const { speechesList = [] } = this.state;
    if (speechesList.length < 1) {
      return (
        <Text>
          暂无信息展示
        </Text>
      );
    }
    //console.log('speechesList', speechesList);
    return (
      <View
       style={styles.speechesList}
      >
        <ListView
          dataSource={speechesList}
          renderRow={(rowData) => {
            return (SpeechesItemRender(rowData));
          }}
        />
      </View>
    )
  }
}
export default SpeechesAll;
