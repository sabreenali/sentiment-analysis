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
  FlatList,
  ScrollView
} from 'react-native';

console.disableYellowBox = true;

export default class App extends Component<{}> {

  constructor(props){
    super(props);

    this.state = {
      inputText: "@realdonaldtrump",
      //data: {},

      //Extraversion
      Extraversion: [],
      // cheerfullness:"",
      // activity_level:"",

      //Agreeableness
      Agreeableness:[],
    //  trust:"",
      AgreeablenessID:"",
      AgreeablenessPercentage:"",

      //Neuroticism (BIG5 personality):
      Neuroticism: [],
      // prone_to_worry: "",
      // melancholy: "",
      // susceptible_to_stress:"",

      Needs:[],
      // closeness:"",
      // curiosity:"",
      // excitement:"",

      Values:[],
      // openness_to_change:"",
      // hedonism: "",

    };
    //this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleSubmit(){
    console.log(this.state.inputText);
    var that = this;
    var username = this.state.inputText;
    //http://0.0.0.0:8000/
    fetch("http://0.0.0.0:8000/?handle=" + username)
    .then((response)=>response.json())
    .then(function(response){
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
    //cheerfullness
    this.state.Extraversion.push({
      id: data["tree"]["children"][0]["children"][0]["children"][2]["children"][2]["id"],
      percentage: data["tree"]["children"][0]["children"][0]["children"][2]["children"][2]["percentage"],
      });
      //activity_level
    this.state.Extraversion.push({
      id: data["tree"]["children"][0]["children"][0]["children"][2]["children"][0]["id"],
      percentage: data["tree"]["children"][0]["children"][0]["children"][2]["children"][0]["percentage"],
      });
      //trust
      this.state.Agreeableness.push({
        id: data["tree"]["children"][0]["children"][0]["children"][3]["children"][5]["id"],
        percentage: data["tree"]["children"][0]["children"][0]["children"][3]["children"][5]["percentage"],
      })
      //trust
      // this.state.Agreeableness.push({
      //   id: data["tree"]["children"][0]["children"][0]["children"][3]["children"][5]["id"],
      //   percentage: data["tree"]["children"][0]["children"][0]["children"][3]["children"][5]["percentage"],
      // })
      this.setState({
        Agreeableness:[{id: data["tree"]["children"][0]["children"][0]["children"][3]["children"][5]["id"],
        percentage: data["tree"]["children"][0]["children"][0]["children"][3]["children"][5]["percentage"],
      }],
        // AgreeablenessID: this.state.Agreeableness[0]["id"],
        // AgreeablenessPercentage: this.state.Agreeableness[0]["percentage"],
      })
      //prone_to_worry
      this.state.Neuroticism.push({
        id: data["tree"]["children"][0]["children"][0]["children"][4]["children"][1]["id"],
        percentage: data["tree"]["children"][0]["children"][0]["children"][4]["children"][1]["percentage"],
      })
      //melancholy
      this.state.Neuroticism.push({
        id: data["tree"]["children"][0]["children"][0]["children"][4]["children"][2]["id"],
        percentage: data["tree"]["children"][0]["children"][0]["children"][4]["children"][2]["percentage"],
      })
      //susceptible_to_stress
      this.state.Neuroticism.push({
        id: data["tree"]["children"][0]["children"][0]["children"][4]["children"][5]["id"],
        percentage: data["tree"]["children"][0]["children"][0]["children"][4]["children"][5]["percentage"],
      })
      //closeness
      this.state.Needs.push({
        id: data["tree"]["children"][1]["children"][0]["children"][1]["id"],
        percentage: data["tree"]["children"][1]["children"][0]["children"][1]["percentage"],
      })
      //curiosity
      this.state.Needs.push({
        id: data["tree"]["children"][1]["children"][0]["children"][2]["id"],
        percentage: data["tree"]["children"][1]["children"][0]["children"][2]["percentage"],
      })
      //excitement
      this.state.Needs.push({
        id: data["tree"]["children"][1]["children"][0]["children"][3]["id"],
        percentage: data["tree"]["children"][1]["children"][0]["children"][3]["percentage"],
      })
      //openness_to_change
      this.state.Values.push({
        id: data["tree"]["children"][2]["children"][0]["children"][1]["id"],
        percentage: data["tree"]["children"][2]["children"][0]["children"][1]["percentage"],
      })
      //hedonism
      this.state.Values.push({
        id: data["tree"]["children"][2]["children"][0]["children"][2]["id"],
        percentage: data["tree"]["children"][2]["children"][0]["children"][2]["percentage"],
      })
    console.log("state", this.state);
    // this.setState({
    //   cheerfullness: data["tree"]["children"][0]["children"][0]["children"][2]["children"][2]["percentage"],
    //   activity_level: data["tree"]["children"][0]["children"][0]["children"][2]["children"][0]["percentage"],
    //
    //   trust: data["tree"]["children"][0]["children"][0]["children"][3]["children"][5]["percentage"],
    //
    //   prone_to_worry: data["tree"]["children"][0]["children"][0]["children"][4]["children"][1]["percentage"],
    //   melancholy: data["tree"]["children"][0]["children"][0]["children"][4]["children"][2]["percentage"],
    //   susceptible_to_stress: data["tree"]["children"][0]["children"][0]["children"][4]["children"][5]["percentage"],
    //
    //   closeness: data["tree"]["children"][1]["children"][0]["children"][1]["percentage"],
    //   curiosity: data["tree"]["children"][1]["children"][0]["children"][2]["percentage"],
    //   excitement: data["tree"]["children"][1]["children"][0]["children"][3]["percentage"],
    //
    //   openness_to_change: data["tree"]["children"][2]["children"][0]["children"][1]["percentage"],
    //   hedonism: data["tree"]["children"][2]["children"][0]["children"][2]["percentage"],
    // });
  }

_renderItem(item){
  var percent = Math.round(item.percentage*100);

  return(
    <View style={styles.row}>
      <Text style={styles.item}>{item.id}: </Text>
      <Text style={styles.item}>{percent} %</Text>
    </View>
  );
}


  render() {
    console.log("render", this.state.Agreeableness);
    console.log("render", this.state.Extraversion);
    var arr = [];
    arr.push({
      id: this.state.AgreeablenessID,
      percentage: this.state.AgreeablenessPercentage,
    })
    return (
      <View style={styles.container}>
      <View style={{flexDirection:'row'}}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>
            Sentiment Analysis
            </Text>
          </View>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', margin:15,}}>
        <Text style={{marginHorizontal:10}}>
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
          <View style={{flexDirection:'row'}}>
            <View style={styles.header2Container}>
              <Text style={styles.header2}>Traits</Text>
            </View>
          </View>
          <View style={{flexDirection:'row'}}>

<ScrollView>
            <View style={styles.list}>
              <Text style={styles.title}>Extraversion (BIG5 personality)</Text>
              <FlatList
                data={this.state.Extraversion}
                renderItem={({item}) => this._renderItem(item)}
              />
            </View>
            <View style={styles.list}>
              <Text style={styles.title}>Agreeableness (BIG5 personality)</Text>
              <FlatList
                data={this.state.Agreeableness}
                renderItem={({item}) => this._renderItem(item)}
              />
            </View>
            <View style={styles.list}>
            <Text style={styles.title}>Neuroticism (BIG5 personality)</Text>
            <FlatList
              data={this.state.Neuroticism}
              renderItem={({item}) => this._renderItem(item)}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.title}>Needs</Text>
            <FlatList
              data={this.state.Needs}
              renderItem={({item}) => this._renderItem(item)}

            />
          </View>
          <View style={styles.list}>
            <Text style={styles.title}>Values</Text>
            <FlatList
              data={this.state.Values}
              renderItem={({item}) => this._renderItem(item)}
            />
          </View>
        </ScrollView>
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
    flexDirection:'row',
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  header:{
    fontSize:30,
    padding:13,
  },
  button:{
    backgroundColor:'red',
    width:200,
    //borderRadius:100,
    alignItems:'center'
  },
  submitContainer:{
    alignItems:'center',
    paddingBottom: 15,
  },
  header2Container:{
    flex:1,
    backgroundColor:"#dfdfdf",
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    marginBottom:10,
  },
  header2:{
    fontSize:20,
  },
  list:{
    height:80,
    flex:1,
    flexDirection:'column',
    paddingHorizontal:20,
    borderBottomWidth:1,
    borderBottomColor:'gray'

  },
  row:{
    borderColor:'gray',
    flexDirection:'row'
    //borderBottomWidth: 1,
  },
  title:{
    fontSize:16,
    fontWeight:'bold',
    borderBottomWidth:1,
    borderBottomColor:'gray',
    //textDecorationLine:'underline'
  },
  item:{
    padding:5,
  }


});
