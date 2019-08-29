import React, {Component} from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Card, Left, Right, Body, CardItem, Form, Picker } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import { color1, color2, color3, color4, color5 } from './Color';

const data = [
  {id: 1, nama: 'Ahmad Faris'},
  {id: 2, nama: 'Rani Pebrianti'},
  {id: 3, nama: 'Ferdi Rahman'},
  {id: 4, nama: 'Jason Bourne'},
  {id: 5, nama: 'John Wick'},
  {id: 6, nama: 'Jack Reacher'},
]

class SimpleModal extends Component{
  constructor(props){
    super(props);
    this.state=({
      lebar: Dimensions.get('window').width - 500,
      tinggi: Dimensions.get('window').height - 180,
      selected: "key1"
    })
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  renderItem(res){
    console.log(res)
    return(
      <Row style={{ margin: 3 }} key={res.item.id}>
        <Col style={ styles.colStyle } onPress={this.props.changeModalVisibility}>
          <Text style={ styles.textStyle }>{res.item.nama}</Text>
        </Col>
      </Row>
    );
  }

  testLoop = () => {
    return data.map(res=> this.renderItem(res));
  }

  render(){

    return(
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={{ width: this.state.lebar, height: this.state.tinggi, backgroundColor: 'white'}}>
          <Row style={{ height: 100, backgroundColor: '#ffffff', padding: 20, justifyContent: 'center', borderColor: color1, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 30, fontFamily:'Roboto' }}>List SPG</Text>
          </Row>
          <Grid>
            <Row>
            <FlatList
              data={data}
              renderItem={(item)=> this.renderItem(item)}
            />
            </Row>
          </Grid>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  colStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 1,
    backgroundColor: color3,
    borderRadius: 5
  },

  textStyle: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 20,
  }
})


export default SimpleModal;
