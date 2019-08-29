import React, {Component} from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity, ScrollView, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import { Card, Left, Right, Body, CardItem, Form, Picker } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import { color1, color2, color3, color4, color5 } from './Color';

const data = [
  {id: 1, bill: 'Bill 1'},
]

class SimpleModal extends Component{
  constructor(props){
    super(props);
    this.state=({
      lebar: Dimensions.get('window').width - 480,
      tinggi: Dimensions.get('window').height - 180,
      selected: "key1",
      list: []
    })
  }

  componentDidMount(){

  }

  _storeData = async () => {
    try {

      await AsyncStorage.setItem('Data', JSON.stringify(datax));
      this.props.changeModalVisibility(false, 7);
      alert('Data Berhasil Disimpan');


    } catch (error) {
      // Error saving data
    }
  };


  _retreiveData = async () => {
    try {
      const value = await AsyncStorage.getItem('Data');
      if (value !== null) {
        // We have data!!
        let data = JSON.parse(value);
        console.log(data);

        this.setState({list: data}); 
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  onPressHapus(res){
    let array = [];

    array = this.props.tempBill;
    //let index = array.indexOf(res);

    array.splice(res, 1);

    console.log(array);
  }

  renderItem(res){
    //console.log(res)
    return(
      <Row style={{ margin: 3, height: 40, borderBottomWidth: 1, borderColor: color4}} key={res.item.id}>
        <Col size={6} style={{  justifyContent: 'center', padding: 5}}>
          <Text>{res.item.billName}</Text>
        </Col>
        <Col size={1} style={{ padding: 3}}>
          <View style={{ backgroundColor: color1, flex: 1,height: 30, borderRadius: 5 , justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.textStyle, {fontSize: 10, color: 'white'}]}>
            Lanjutkan
          </Text>
          </View>
        </Col>
        <Col size={1} style={{ padding: 3 }}>
          <TouchableOpacity style={{ backgroundColor: color3, flex: 1,height: 30, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} onPress={ () => this.onPressHapus(res.index) }>
            <Text style={[styles.textStyle, {fontSize: 10, color: 'white'}]}>
              Hapus
            </Text>
          </TouchableOpacity>
        </Col>
      </Row>
    );
  }


  render(){

    //this._retreiveData();

    return(
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={{ width: this.state.lebar, height: this.state.tinggi, backgroundColor: 'white', borderRadius: 5}}>
          <Row style={{ height: 100, backgroundColor: '#ffffff', padding: 30, justifyContent: 'center', borderColor: color1, borderBottomWidth: 1 , borderRadius: 5}}>
            <Text style={{ fontSize: 30, fontFamily:'Roboto' }}>List Bill</Text>
          </Row>
          <Grid style={{ padding: 20}}>
            <Row >
            <FlatList
              data={this.props.tempBill}
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
    margin: 0,
    backgroundColor: color5,
    borderRadius: 5,
    height: 40,
  },

  textStyle: {
    fontFamily: 'Roboto',
    color: color3,
    fontSize: 20,
  }
})


export default SimpleModal;
