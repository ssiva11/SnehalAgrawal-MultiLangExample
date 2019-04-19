import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import stringsoflanguages from './stringsoflanguages';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    const lang = [
      { shortform: 'hi', longform: 'Hindi' },
      { shortform: 'ma', longform: 'Marathi' },
      { shortform: 'en', longform: 'English' },
      { shortform: 'fr', longform: 'French' },
    ];
    global.lang = lang;
  }
  settext(value) {
    stringsoflanguages.setLanguage(value);
    this.props.navigation.navigate('ContentScreen' , {JSON_Clicked_Item:value,});
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={{ marginTop: 60 }}>
          <Text style={styles.textHeading}>
            Please Select Preferred Language
          </Text>
        </View>
        <Image
          source={{
            uri:
              'https://aboutreact.com/wp-content/uploads/2018/09/language.png',
          }}
          style={styles.img}
        />
        <ScrollView style={{ marginTop: 30, width: '80%' }}>
          {global.lang.map((item, key) => (
            <View style={styles.elementContainer}>
              <Text
                ref={item.shortform}
                onPress={() => this.settext(item.shortform)}
                style={styles.text}>
                {item.longform}
              </Text>
              <View style={styles.saparator} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: { 
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center' 
  },
  textHeading: { 
    color: '#191919',
    fontSize: 30,
    textAlign: 'center' 
  },
  img: { 
    width: 64,
    height: 64,
    marginTop: 30 
  },
  elementContainer: {
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
  },
  text: { 
    color: '#191919',
    fontSize: 25 
  },
  saparator: {
    height: 0.5,
    width: '60%',
    backgroundColor: '#C2C2C2',
    marginTop: 10,
  },
});