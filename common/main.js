import React, {Component, propTypes} from 'react';
import {View, Text, ScrollView} from 'react-native';
import TopLineHead from './topLineHead';
import DailyHeadlinesList from './dailyHeadlinesList';
import SpeechShowcaseList from './speechShowcaseList';
import QuestionList from './questionList';
const styles = {};

class Main extends Component {
  static propTypes = {}
  static contextTypes = {}
  render() {
    const {navigation = {}} = this.props;
    return (
      <View>
        <ScrollView>
          <TopLineHead navigation={navigation}/>
          <DailyHeadlinesList/>
          <SpeechShowcaseList/>
          <QuestionList navigation={navigation}/>
        </ScrollView>
      </View>
    )
  }
}
export default Main;
