import React, {Component, propTypes} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import superagent from 'superagent';
const styles = {};

class QuestionDetails extends Component {
  static propTypes = {}
  static contextTypes = {}
  state={}
  componentWillMount() {
    /*fetch(
      'https://apis-fd.zaih.com/v1/questions/90000035532557849161',
       {method: 'get'})
      .then((res)=>{
        console.info('res res', res);
        res.blob();
      })
      .then((response)=>{
        console.info('resMsg resMsg', response);
        this.setState({questionsDefails: response});
      })
      .catch((err)=>{
        console.log('err', err);
      })*/
      const self = this;
      superagent
        .get('https://apis-fd.zaih.com/v1/questions/90000035532557849161')
        .end(function (err, sres) {
          if (err) {
            console.log('error', err);
          }
          console.info('resMsg resMsg', sres.text);
          self.setState({questionsDefails: JSON.parse(sres.text)});
        });
  }
  render() {
    const {navigation = {}} = this.props;
    const {questionsDefails} = this.state;
    if (!questionsDefails) {
      return <Text>loadding</Text>;
    }
    console.info('questionsDefails', questionsDefails);
    return (
      <View
       style={{
        backgroundColor: '#f5f5f5'
       }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 23,
            marginTop:15,
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderColor: '#e5e5e5',
            backgroundColor: '#ffffff',
            paddingLeft: 15,
            paddingRight: 15,
            justifyContent: 'space-between'
          }}
        >
          <Image
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              borderWidth: 1,
              marginTop: 15,
            }}
            source={{uri: questionsDefails.asker.avatar}}
          />
          <View
            style={{width: 255, marginTop: 15}}
            
          >
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >

              <Text
                style={{fontSize: 13, color: '#999'}}
              >
                {questionsDefails.asker.nickname}
              </Text>

              <Text
               style={{fontSize: 13, color: '#f85f48'}}
              >
                ￥{(questionsDefails.offer / 100)}
              </Text>

            </View>
          

            <Text
              style={{
                width: 252,
                fontSize: 15, color: '#3f3f3f',
                marginBottom: 23, marginTop: 25,
                fontWeight: '400'
              }}
            >
              {questionsDefails.content}
            </Text>
          </View>
        </View>

      </View>
    )
  }
}
export default QuestionDetails;
