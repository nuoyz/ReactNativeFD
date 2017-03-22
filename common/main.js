import React, {Component, propTypes} from 'react';
import {View, Text} from 'react-native';
import TopLineHead from './topLineHead';
import DailyHeadlinesList from './dailyHeadlinesList';
import SpeechShowcaseList from './speechShowcaseList';
import QuestionList from './questionList';
const styles = {};

class Main extends Component {
  static propTypes = {}
  static contextTypes = {}
  render() {
    return (
      <View
       style={{
        //backgroundColor: '#f5f5f5'
       }}
      >
        <TopLineHead/>
        <DailyHeadlinesList/>
        <SpeechShowcaseList/>
        <QuestionList/>
      </View>
    )
  }
}
export default Main;
