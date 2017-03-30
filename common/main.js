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
    //console.log('navigation', this.props.navigation);
    return (
      <View
       style={{
        //backgroundColor: '#f5f5f5'
       }}
      >
        <ScrollView>
          <TopLineHead navigation={navigation}/>
          <DailyHeadlinesList/>
          <SpeechShowcaseList/>
          <QuestionList/>
        </ScrollView>
      </View>
    )
  }
}
export default Main;
