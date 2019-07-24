import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class Welcome extends Component{
  render(){
    console.log(this.props);
    return(
      <View style={ styles.viewStyle }>
        <Button
          title="Hello"
          onPress={()=> {
            console.log("oke");
            this.props.navigation.navigate('Activity');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30
  }
});
