import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Item, Label, Input } from 'native-base';

import { color1, color2, color3, color4 } from './Color';

export default class Login extends Component{
  render(){
    return(
        <ImageBackground resizeMode={'cover'} source={require('./img/background.jpg')} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Image source={require('./img/logo_bursa.png')} style={{ width: 250, height: 250 }} resizeMode={'contain'}/>
          </View>
          <View style={styles.formStyle}>
            <Input placeholder="Username" />
          </View>
          <View style={styles.formStyle}>
            <Input placeholder="Password" />
          </View>
          <TouchableOpacity style={[styles.formStyle, {justifyContent: 'center', alignItems: 'center', backgroundColor: color3, marginTop: 20 }]} onPress={()=> {this.props.navigation.navigate('Home')}}>
              <Text style={styles.textStyle}>Login</Text>
          </TouchableOpacity>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },

  formStyle: {
    width: 350,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 100,
    marginTop: 10,
    paddingLeft: 10
  },

  textStyle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'white'
  }
})
