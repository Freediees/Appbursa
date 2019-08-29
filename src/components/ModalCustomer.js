import React, {Component} from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Card, Left, Right, Body, CardItem, Form, Picker, Item, Label, Input } from 'native-base';
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
      lebar: Dimensions.get('window').width - 180,
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

  render(){

    return(
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={{ width: this.state.lebar, height: this.state.tinggi, backgroundColor: 'white'}}>
          <Grid style={{ flex: 1}}>
            <Row style={{ height: 100, backgroundColor: '#ffffff', padding: 20, justifyContent: 'space-between', borderColor: color1, borderBottomWidth: 1 }}>
                <TouchableOpacity
                  onPress={this.props.changeModalVisibility}
                  style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor:color1}}>
                  <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Cancel</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 30, fontFamily:'Roboto' }}>List Customer</Text>

                <TouchableOpacity
                  onPress={this.props.changeModalVisibility}
                  style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: color2, borderRadius: 5}}>
                  <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Charge</Text>
                </TouchableOpacity>
            </Row>

            <Row>
              <Col>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                      <Item floatingLabel>
                        <Label>Nama Customer</Label>
                        <Input />
                      </Item>
                </View>

                <View style={{ backgroundColor: color3, height:40, margin: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                  <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Roboto' }}>Tambah Customer Baru</Text>
                </View>

                <FlatList
                  data={data}
                  renderItem={(item)=> this.renderItem(item)}
                />
              </Col>
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
