import React from 'react';
import {
  Button,
  
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';


class TutorialScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Tutorial',
  
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

module.exports = {
  TutorialScreen : TutorialScreen,
}