// Imports
import React from 'react';
import {
  TouchableOpacity,
  Button,
  View,
  Text,
  TextInput,
  Picker,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';


// Constants
const PLAY_SCREEN = "Play";
const IMAGE_URI = "http://clipart-library.com/data_images/334696.png";
const IMAGE_WIDTH = 200;
const IMAGE_HEIGHT = 200;
const PASSCODE = "logic";

/** 
  * @desc this class is to render home screen
  * examples 
  * @author Shashi Siva
  * @required 
*/
class HomeScreen extends React.Component {
 
   constructor() {
    super();
   }
  onPress=() => { 

    if(this.state.code == PASSCODE){
       this.props.navigation.navigate(PLAY_SCREEN, { level: this.state.level});
     
    }
   else{
     alert("Incorrect Passcode. Please Try again")
    // this.setState('': code);
   }

  };

  state = {
    code: "",
    level : "1",
  }
  
  render() {

    let data = [{
      value: '1',
    }, {
      value: '2',
    }, {
      value: '3',
    }];

    return (
        <View style={styles.containerHeader}>
        <Text style={styles.title}>The Mystery Number Game</Text>
        <Image
          source={{ uri: IMAGE_URI }}
          style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
        />
        
         
          <View >
             <Picker
            mode= 'anchored'
            selectedValue={this.state.level}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({level: itemValue})}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
        </Picker>
          </View>
        
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          onChangeText={(level) => this.setState({level})}
          returnKeyType="next"
          placeholder="Level"
          placeholderTextColor="black"
          value={this.state.level}
        />
       
        <TextInput
          style={styles.input}
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
          placeholder="Code"
          placeholderTextColor="black"
          secureTextEntry
          onChangeText={(code) => this.setState({code})}
          value={this.state.code}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onPress}>
          >
          <Text style={styles.buttonText}>PLAY</Text>
        </TouchableOpacity>
        

      </View>

    );
  }
}

// Export the class
module.exports = {
  HomeScreen : HomeScreen,
}

// Stylesheet
const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
    backgroundColor: 'grey',
    flexBox: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontFamily: 'Segoe Print',
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  input: {
    height: 30,
    width: 150,
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    color: 'black',
  },
});
