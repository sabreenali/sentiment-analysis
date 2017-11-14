/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  FlatList
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

  constructor(props){
    super(props);

    this.state = {
      inputText: "",
      data: {},
      neg_tweets_percent: "",
      pos_tweets_percent: "",
      pos_tweets: [],
      neg_tweets: [],

    };
    //this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleSubmit(){
    console.log(this.state.inputText);
    var that = this;
    var username = this.state.inputText;
    fetch("http://127.0.0.1:5000/?handle=" + username)
    .then((response)=>response.json())
    .then(function(response){

      console.log(response);
      that.setState({
        data: response,
      });
    })
    .then(function(){
      that.getData();
    });
    this.textInputRef.clear();
  }

  getData(){
    console.log(this.state.data);
    var data = this.state.data;
    this.setState({
      neg_tweets_percent: data["neg_tweets_percent"],
      pos_tweets_percent: data["pos_tweets_percent"],
      neg_tweets: data["neg_tweets"],
      pos_tweets: data["pos_tweets"]
    }, ()=>{
      var pos_tweets_arr = [];
      for(var t of this.state.pos_tweets){
        pos_tweets_arr.push({
          tweet: t,
        });
      }
      var neg_tweets_arr = [];
      for(var t of this.state.neg_tweets){
        neg_tweets_arr.push({
          tweet: t,
        });
      }
      this.setState({
        pos_tweets: pos_tweets_arr,
        neg_tweets: neg_tweets_arr
      })
    }
  );
  }

_renderItem(item){
  return(
    <View style={styles.row}>
    <Text style={styles.tweet}>{item.tweet}</Text>
    </View>
  );
}


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>
          Sentiment Analysis
          </Text>
        </View>
        <View>
        <Text>
        Input Twitter Handle:
        </Text>
        <TextInput
        placeholder="e.g. @realdonaldtrump"
        placeholderTextColor="#666666"
        value={this.state.inputText}
        onChangeText={(inputText) => this.setState({inputText})}
        style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal:4}}
        ref={ref => this.textInputRef = ref}
      />
        </View>

        <View style={styles.submitContainer}>
          <TouchableHighlight style={styles.button} underlayColor="transparent" onPress={this.handleSubmit}>
            <View>
              <Text style={{color:"white", paddingVertical: 7}}>
              Submit
              </Text>
            </View>
          </TouchableHighlight>
          </View>

          <View>
          <Text style={styles.percentage}>Positive Tweets Percentage: {this.state.pos_tweets_percent}</Text>
          <FlatList
            data={this.state.pos_tweets}
            renderItem={({item}) => this._renderItem(item)}
          />
          <Text>Negative Tweets Percentage: {this.state.neg_tweets_percent}</Text>
          <FlatList
            data={this.state.neg_tweets}
            renderItem={({item}) => this._renderItem(item)}
          />
          </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop:30,
  },
  headerContainer:{
    backgroundColor:'#d3d3d3',
  },
  header:{
    fontSize:30,
    padding:13,
  },
  button:{
    backgroundColor:'red',
    width:120,
    //borderRadius:100,
    alignItems:'center'
  },
  submitContainer:{
    alignItems:'center',
    paddingBottom: 15,
  },
  tweet:{
    fontSize:14,
    padding:5,
    paddingHorizontal: 10

  },
  row:{
    borderColor:'gray',
    borderBottomWidth: 1,
  }


});
