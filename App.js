import React from 'react';
//For React Navigation Version 2+
//import {createStackNavigator} from 'react-navigation';
//For React Navigation Version 3+
import {createStackNavigator,createAppContainer} from 'react-navigation';
import LanguageSelectionScreen from './pages/LanguageSelectionScreen';
import ContentScreen from './pages/ContentScreen';
const App = createStackNavigator({
  LanguageSelectionScreen: { 
      screen: LanguageSelectionScreen, 
      navigationOptions: { header: null } 
  },
  ContentScreen: { screen: ContentScreen },
});
//For React Navigation version 2+
//export default App;
//For React Navigation version 3+
export default createAppContainer(App);