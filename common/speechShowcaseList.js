import React, {Component, propTypes} from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  'speech-showcase-container': {
    backgroundColor: '#fff',
    //paddingBottom: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  'speech-showcase-title': {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 331,
  },
  'speechList': {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    //marginLeft: 8,
    //marginRight: 8,
    marginBottom: 26
  },
  'speechList-item': {
     //marginRight: 4,
     marginLeft: 15,
  },
  'speechList-item-img': {
    width: 118,
    height: 118,
  },
  'speechList-item-title': {
    width: 110,
    fontSize: 12,
    lineHeight: 20,
    color: '#3f3f3f',
    fontWeight: '600'
  },
  'speechList-item-editor': {
     fontSize: 12,
     color: '#999',
     fontWeight: 'normal'
  },
});
function speechListRender (data, index) {//[]
  //console.info('speechListRenderdata', data);
  return (
    <View
      key={`speechList-${index}`}
      style={
        styles['speechList-item']
      }
    >
      <View
      >
        {
          data.is_new ?
          <Image
            style={{
              position: 'absolute',
              width: 28,
              height: 25,
              zIndex: 2,
              top: 5,
              left: 5
            }}
            source={require('./img/newtag.png')}
          /> : null
        }
        <Image
          style={styles['speechList-item-img']}
          source={{uri: data.icon}}
        />
        {
          data.participants_count ?
            <Text
              style={{
                position: 'absolute',
                top: 94,
                left: 4,
                color: '#fff',
                fontSize: 12
              }}
            >
              {data.participants_count}人参加
            </Text> : <Text></Text>
        }
      </View>
      <View>
        <Text
          style={styles['speechList-item-title']}
        >
          {data.title}
        </Text>
      </View>
      <View>
        <Text
          style={styles['speechList-item-editor']}
        >
          {data.respondent.nickname}
        </Text>
      </View>
    </View>
  );
}
class SpeechShowcaseList extends Component {
  static propTypes = {}
  static contextTypes = {}
  state = {
    speechList: []
  }
  componentWillMount() {
    fetch('http://fd.zaih.com/speech_api/v1/banner_speeches',
         {
          method: 'get'
         }).then((res) => {
             //console.info('res', res.json());
             return res.json();
         }).then((response) => {
          //console.info('response response', response);
          this.setState({speechList: response});
         });
  }
  render() {
    const {speechList} = this.state;
    if (!speechList) {
      return (
        <Text>
          暂无信息展示
        </Text>
      );
    }
    const speechListItems = speechList.map(speechListRender);
    return (
      <View
        style={styles['speech-showcase-container']}
      >
         <View
            style={styles['speech-showcase-title']}
          >
            <Text
              style={{
                fontSize: 14,
                color: '#3f3f3f',
                //fontWeight: 'bold',
              }}
            >
              分答小讲
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#999'
              }}
            >
              查看答案 >
            </Text>
          </View>
          <View
            style={styles.speechList}
          >
            <ScrollView
              horizontal={true}
            >
              {speechListItems}
            </ScrollView>
          </View>
      </View>
    );
  }
}
export default SpeechShowcaseList;
