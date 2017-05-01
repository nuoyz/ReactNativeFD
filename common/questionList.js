import React, {Component, propTypes} from 'react';
import {View, Text, Image, ListView, StyleSheet, TouchableOpacity} from 'react-native';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import {observable, action} from 'mobx'
const styles = StyleSheet.create({
  'questionList': {
    //backgroundColor: 'white',
    marginBottom: 10
  },
  'questionList-item': {
    //width: 319,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 22,
    backgroundColor: 'white',
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
    //borderStyle: 'solid',
    borderRadius: 20
  },
  'questionList-anwser-voice': {
     position: 'relative',
     width: 173,
     height: 41,
     borderRadius: 22,
     //left: -4,
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
    left: 11,
    top: 17,
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
function questionListRender(data, i) {
  const {question} = data;
  const key = parseInt(Math.random(), 10);
  return (
    <View
      key={key}
      style={styles['questionList-item']}
    >
      <TouchableOpacity
        onPress={()=>this.pushNavigater(question.id)}
      >
        <Text
          style={{
            fontSize: 16,
            color: '#3f3f3f',
            //fontWeight: '100'
          }}
        >
          {data.question.content}
        </Text>
      </TouchableOpacity>
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
            /> : null
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
                //fontSize: 16,
                marginRight: 20
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                marginRight: 48,
                fontSize: 13
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
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <Text
              style={{
                color: '#3f3f3f',
                fontSize: 16,
                fontWeight: '200',
                letterSpacing : 4
              }}
            >
              {data.actor.nickname}
            </Text>
            {
              data.action === 'recommend' ?
                <Image
                  style={{
                    //position: 'absolute',
                    width: 30,
                    height: 15,
                    marginLeft: 6,
                    marginTop: 3
                    //left: 78,
                    //top: 0
                  }}
                  source={require('./img/recommendTag.png')}
                /> : null
            }
          </View>
          <Text
            style={{
              color: '#999',
              fontSize: 12
            }}
          >
            {data.actor.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={
            ()=>{
              //写一个action 来处理
            }
          }
        >
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
                marginLeft: 12,
                marginTop: -4
              }}
              source={require('./img/follow.png')}
            />
          </View>
        </TouchableOpacity>
      </View>  
    </View>
  );
}
class QuestionList extends Component {
  static propTypes = {}
  static contextTypes = {}
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
      return r1 !== r2;
    }});
    this.state = {
      ds,
      questionList: ds.cloneWithRows([]),
    };
  }
  state = {
    questionList: []
  }
  @observable userFollow = false;
  @action addFollowbyId() {
    fetch('https://apis-fd.zaih.com/v1/accounts/587477606/follow',
      method: 'post'
    )
    .then((res)=>{
      res.json()
    })
    .then(()=>{
      res.response();
      this.userFollow
    })
    .catch((err)=>{
      console.log('err', err);
    })
  }
  endReachedFetchData = () => {//触到底部获取数据
    const {min_id, order_score} = this.state;
    let {page} = this.state;
    fetch(`http://fd.zaih.com/feed_api/v1/self/timeline?page=${page}&per_page=20&min_id=${min_id}&order_score=${order_score}`,
     {method: 'get'})
     .then((res) => {
         return res.json();
     })
     .then((response) => {
        if (response) {
          const {questionListArray = []} = this.state;
          const lastArrEle = response[response.length - 1];
          const newPage = page++;
          const newQuestionList = [...questionListArray, ...response];
          this.setState({
            questionListArray: newQuestionList,
            questionList: this.state.ds.cloneWithRows(newQuestionList),
            min_id: lastArrEle.id,
            order_score: lastArrEle['order_score'],
            page: newPage
          });
        }
     });
  }
  pushNavigater(id) {
    const {navigate = {}} = this.props.navigation;
    console.log('this.props.navigation', this.props.navigation);
    navigate('QuestionDetails', {id, });
  }
  componentWillMount() {
    fetch('http://fd.zaih.com/feed_api/v1/self/timeline?page=1&per_page=20&is_refresh=true',
         {
          method: 'get'
         }).then((res) => {
             return res.json();
         }).then((response) => {
           if (response) {
            const lastArrEle = response[response.length - 1];
             this.setState({
              questionListArray: response,
              questionList: this.state.ds.cloneWithRows(response),
              min_id: lastArrEle.id,
              order_score: lastArrEle['order_score'],
              page: 2
            });
           }
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
          enableEmptySections
          dataSource={questionList}
          initialListSize={20}
          onEndReachedThreshold={40}
          automaticallyAdjustContentInsets={false}
          onEndReached={
             ()=>{
               this.endReachedFetchData()
             }
          }
          renderRow={(rowData) => {
            return (questionListRender.apply(this, [rowData]));
          }}
        />
      </View>
    )
  }
}
export default QuestionList;
