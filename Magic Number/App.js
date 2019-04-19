// Imports
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {HomeScreen } from './HomeScreen.js';
import {PlayScreen } from './PlayScreen.js';
import {TutorialScreen } from './TutorialScreen.js';

const START_SCREEN = "Home"

// Constants
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Play: PlayScreen,
    Tutorial : TutorialScreen,
  },
  {
    initialRouteName: START_SCREEN,
  }
);


/** 
  * @desc this class to render the app
  * examples 
  * @author Shashi Siva
  * @required 
*/
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

