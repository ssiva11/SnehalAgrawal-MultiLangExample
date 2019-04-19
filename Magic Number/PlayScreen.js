import React from 'react';
import {
  Alert,
  AsyncStorage,
  TouchableOpacity,
  Button,
  View,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import RadioGroup from 'react-native-radio-buttons-group';
import RNPickerSelect from 'react-native-picker-select';
import {helperFunctions} from './utility';
import {questionDef,questionMatrix,objectGenStructure } from './Questions.js';
import { Dropdown } from 'react-native-material-dropdown';

// Constants
const START_LIMIT = 50;
const START_LEVEL = 1;
const START_PRIME = 1;
const INIT_ANSWER =  false;
const COUNTER_RESET = 0;
const CASE_EVEN = "even";
const CASE_PRIME = "prime";
const CASE_DIVISBLE_BY = "divisible By";
const CASE_RANGE = "range";
const CASE_EQUAL = "equal";
const CASE_FACTOR = "factor";
const CASE_PFACTOR = "pfactor";
const ALL_CASE_FACTOR = "allFactors";
const STORGAE_LEVEL = "LEVEL";
const NUM_EVEN = 2;
const INC_COUNTER  = 1;

class PlayScreen extends React.Component {
  constructor(props) {
    super(props);

    global.ranges = [[1,20], [2,40], [3,80], [4,160],[5,320]];
    global.limit = START_LIMIT;
    global.isPrime = INIT_ANSWER;
    global.tries = COUNTER_RESET;
    global.answer = String(INIT_ANSWER);
    var helper = new helperFunctions();
     global.avgTries = helper.genAvergareTries(global.limit);
    
     
    global.availableNumbers = helper.populateAvailableNumbers(global.limit);
    this.getData();
    global.currentLevel = parseInt(this.props.navigation.state.params.level);


      global.questionMatrixList = [];
      global.items = this.createNumberDropDownArray(global.limit);
      global.randomNumber = Math.floor(Math.random() * global.limit) + 1;
      global.primes = helper.genPrime(global.limit);
      global.isPrime = helper.checkPrime( global.randomNumber, global.primes);
       global.primeFactors = helper.genPrimeFactors(global.randomNumber);
     global.allFactors = helper.genAllFactors(global.randomNumber);
      global.questionsListData = this.renderQuestionsList(global.currentLevel);
     this.setState({ data: global.questionsListData });         
     global.selectedButton = CASE_PRIME;
    
  
 
  }
 // STATES

  state = {
    triesNum: COUNTER_RESET,
    answerValue: String(INIT_ANSWER),
    factor: 1,
    equal: 1,
    rangeFrom: 1,
    rangeTo: 1,
    detailsText: '',
    myLevel: String(START_LEVEL),
    data: [],
    levelSelected : '',
  };

  
  /** 
  * @desc isFactor
  * examples 
  * @author Shashi Siva
  * @required
  */
 isFactor(value, factor) {
    if (value % factor == 0) {
      global.availableNumbers = global.availableNumbers.filter(
      val => { return val % factor === 0;});
      return true;
    }    
    else {
      global.availableNumbers = global.availableNumbers.filter(
      val => { return val % factor != 0;});
      return false;
    }
  }

  /** 
  * @desc filterPrime
  * examples 
  * @author Shashi Siva
  * @required
  */
  filterPrime(isPrime, primeArray) {
    if (isPrime == "true") {
      global.availableNumbers = primeArray;
      return true;
    }
    else{
      global.availableNumbers = global.availableNumbers.filter(
          val => { return !primeArray.includes(val)});
       return false;
    }  
  }

  /** 
  * @desc checkEqual
  * examples 
  * @author Shashi Siva
  * @required
  */
  checkEqual(value, randomValue) {
    if (randomValue == value) {
      if (global.tries > global.avgTries) {
        Alert.alert('Good Job. The number: ' + String(randomValue) + ". Try again to beat the average tries ");
      }
      else{
        Alert.alert(' Good Job. You did it in the average tries. !!! The number: ' + String(randomValue));
       // this.saveData();
      }


      global.availableNumbers = [randomValue];
      
      return true;
    } 
    else { 
      global.availableNumbers = global.availableNumbers.filter(
        val => { return val != value });
      return false;
      }  
  }

  /** 
  * @desc range
  * examples 
  * @author Shashi Siva
  * @required
  */
  range(valueFrom, valueTo, randomValue) {
    if (randomValue >= valueFrom && randomValue <= valueTo)
    {
      global.availableNumbers = global.availableNumbers.filter(
          val => { return (val >= valueFrom && val <= valueTo)});
      return true;
      
    }
    else
    { 
      global.availableNumbers = global.availableNumbers.filter(
          val => { return !(val >= valueFrom && val <= valueTo)
                }); 
       return false;
    }   
  }

//STORAGE RELATED

/** 
  * @desc saveData
  * examples 
  * @author Shashi Siva
  * @required
  */
  saveData() {
    AsyncStorage.setItem(STORGAE_LEVEL, "2");
    this.setState({ myLevel:  "2"});
  }

  /** 
  * @desc getData
  * examples 
  * @author Shashi Siva
  * @required
  */
  getData() {
    AsyncStorage.getItem(STORGAE_LEVEL)
      .then(value => {
        if (value == null) value = String(START_LEVEL);
        this.setState({ myLevel: value });
        return value;   
      })
      .done();
    
  }

/** 
  * @desc retrieveItem
  * examples 
  * @author Shashi Siva
  * @required
*/
async retrieveItem(key) {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
  }

/** 
  * @desc renderQuestionsList
  * examples 
  * @author Shashi Siva
  * @required
*/
renderQuestionsList(level) {
  
    var dropdownArray = [];
    var dropdownElement = new objectGenStructure();
    var matrix = new questionMatrix();
    matrix.populateQuestions(level);
    var questionsList = matrix.list;
    global.questionMatrixList = matrix.list;
    var questionDefCurr = new questionDef();

    for (var i = 0; i < questionsList.length; i++) {
      dropdownElement = new objectGenStructure();
      questionDefCurr = questionsList[i];
      dropdownElement.label = questionDefCurr.question;
      dropdownElement.value = questionDefCurr.key;
      dropdownArray[i] = dropdownElement;
    }
    return dropdownArray;
}

/** 
  * @desc createNumberDropDownArray
  * examples 
  * @author Shashi Siva
  * @required
*/
createNumberDropDownArray(limit) {
    var dropdownArray = [];
    var dropdownElement = new objectGenStructure();

    for (var i = 0; i < limit; i++) {
      dropdownElement = new objectGenStructure();
      dropdownElement.label = String(i + 1);
      dropdownElement.value = String(i + 1);
      dropdownArray[i] = dropdownElement;
    }
    return dropdownArray;
 }

// BUTTON FUNCTIONS
/** 
  * @desc onPress
  * examples 
  * @author Shashi Siva
  * @required
*/
onPress = data => this.setState({ data });

/** 
  * @desc _onPressButton
  * examples 
  * @author Shashi Siva
  * @required
*/
_onPressButton = () => {

    global.tries = global.tries + INC_COUNTER;
    global.answer = String(INIT_ANSWER);
    var myAnswer = String(INIT_ANSWER);
    var textDetails = this.state.detailsText;
    
    switch (global.selectedButton) {
      case CASE_EVEN:
        var myfunc = this.isFactor(global.randomNumber, NUM_EVEN);
        myAnswer = String(this.isFactor(global.randomNumber, NUM_EVEN));
        textDetails = textDetails + 'Even : ' + myAnswer + '\n';
       
        break;
      case CASE_PRIME:
        myAnswer = String(global.isPrime);
        this.filterPrime(myAnswer, global.primes);
        textDetails = textDetails + 'Prime : ' + myAnswer + '\n';
         
        break;
      case CASE_FACTOR:
        myAnswer = String(
          this.isFactor(global.randomNumber, parseInt(this.state.factor))
        );
        textDetails =
          textDetails +
          'Divisble By ' +
          this.state.factor +
          ' : ' +
          myAnswer +
          '\n';
        break;
      case CASE_EQUAL:
        myAnswer = String(this.checkEqual(parseInt(this.state.equal),global.randomNumber));
        textDetails =
          textDetails + 'Equal : ' + this.state.equal + ' : ' + myAnswer + '\n';
        break;
      case CASE_PFACTOR:
       textDetails =
          textDetails + 'Number of Prime Factors : ' + global.primeFactors + '\n';
        
        break;
         case ALL_CASE_FACTOR:
       textDetails =
          textDetails + 'Number of Factors : ' + global.allFactors + '\n';
        
        break;
      case CASE_RANGE:
        myAnswer = String(this.range(this.state.rangeFrom, this.state.rangeTo, global.randomNumber));
        textDetails =
          textDetails +
          'Between ' +
          this.state.rangeFrom +
          ' And  ' +
          this.state.rangeTo +
          ' : ' +
          myAnswer +
          '\n';
        break;
      default:
        myAnswer = String(INIT_ANSWER);
    }
    this.setState({ triesNum: global.tries });
    this.setState({ answerValue: myAnswer });
    this.setState({ detailsText: textDetails });
  };

/** 
  * @desc _onPressButtonGiveUp
  * examples 
  * @author Shashi Siva
  * @required
*/
  _onPressButtonGiveUp() {
    Alert.alert('The number I guessed was : ' + String(global.randomNumber));
  }

/** 
  * @desc _onPressHint
  * examples 
  * @author Shashi Siva
  * @required
*/
  _onPressHint() {
    Alert.alert('Numbers Left : ' + String(global.availableNumbers));
  }

// RENDER

  render() {


   // this.setState({ levelSelected: levelSelect}); 
    
    global.selectedButton = global.questionsListData.find(
      e => e.selected == true
    );
    global.selectedButton = global.selectedButton
      ? global.selectedButton.value
      : global.questionsListData[0].label;
    return (
      <View style={styles.containerPlayHeader}>
        <Text style={styles.levelTitle}>Level :  {global.currentLevel}</Text>
        <Text style={styles.playScreenTitle}>
          Can you find the number I have chosen betwen 1 and {global.limit}. Average tries : {global.avgTries} ?
        </Text>
        <Text
          style={{ fontSize: 18, marginTop: 10, marginBottom: 20, bold: true }}>
          List of Questions you can ask me are :
        </Text>

        <RadioGroup
          radioButtons={global.questionsListData}
          onPress={this.onPress}
        />

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={styles.container}>
          
            <RNPickerSelect
              items={global.items}
              placeholder={{}}
              onValueChange={value => {
                this.setState({ factor: value });
              }}>
              <Button title="Divisble By" />
            </RNPickerSelect>
          
      />
          </View>
          <View style={styles.container}>
            <RNPickerSelect
              items={global.items}
              placeholder={{}}
              onValueChange={value => {
                this.setState({ equal: value });
              }}>
              <Button title="Equal" />
            </RNPickerSelect>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={styles.container}>
            <RNPickerSelect
              items={global.items}
              placeholder={{}}
              onValueChange={value => {
                this.setState({ rangeFrom: value });
              }}>
              <Button title="Between:From" />
            </RNPickerSelect>
          </View>
          <View style={styles.container}>
            <RNPickerSelect
              items={global.items}
              placeholder={{}}
              onValueChange={value => {
                this.setState({ rangeTo: value });
              }}>
              <Button title="Between:To" />
            </RNPickerSelect>
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 18, marginTop: 5, padding: 10, bold: true }}>
            Details
          </Text>
        </View>

        <ScrollView>
          <TextInput
            multiline={true}
            numberOfLines={10}
            editable={false}
            maxLength={5000}
            style={{
              height: 100,
              width: 300,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={detailsText => this.setState({ detailsText })}
            value={this.state.detailsText}
          />
        </ScrollView>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
            }}>
            <Button title="Check" onPress={this._onPressButton} />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
            }}>
            <Button
              style={styles.buttonStyle}
              title="Give Up"
              onPress={this._onPressButtonGiveUp}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
            }}>
            <Button
              style={styles.buttonStyle}
              title="Hint"
              onPress={this._onPressHint}
            />
          </View>
        </View>
        
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.playScreenTitle}>
            Tries: {this.state.triesNum}{' '}
          </Text>
          <Text style={styles.playScreenTitle}>
            Answer: {this.state.answerValue}
          </Text>
        </View>
      </View>
    );
  }
}

module.exports = {
  PlayScreen : PlayScreen,
}

const styles = StyleSheet.create({
  containerPlayHeader: {
    flex: 1,
    backgroundColor: '#FFC0CB',
    alignItems: 'center',
    justifyContent: 'top',
  },
 
  playScreenTitle: {
    fontSize: 20,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'top',
  },
  levelTitle: {
    fontSize: 20,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'top',
  },
  buttonStyle: {
    borderWidth: 1,
    color: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFF00',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 10,
  },
  
});
