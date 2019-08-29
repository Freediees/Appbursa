import React, {Component} from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Card, Left, Right, Body, CardItem, Form, Picker, Item, Label, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import { color1, color2, color3, color4 } from './Color';

class SimpleModal extends Component{
  constructor(props){
    super(props);
    this.state=({
      lebar: Dimensions.get('window').width - 180,
      tinggi: Dimensions.get('window').height - 180,
      selected: "key-1",
      digitBank: ''
    })
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  onChangeDigitBank(text){
    if(text == '123451'){
      this.setState({selected: "key0"});
    }else if(text == '123452'){
      this.setState({selected: "key1"});
    }else if(text == '123453'){
      this.setState({selected: "key2"});
    }else if(text == '123454'){
      this.setState({selected: "key3"});
    }else if(text == '123455'){
      this.setState({selected: "key4"});
    }else if(text == '123456'){
      this.setState({selected: "key5"});
    }else{
      this.setState({selected: "key-1"});
    }

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

                <Text style={{ fontSize: 30, fontFamily:'Roboto' }}>Rp. {this.props.totalHarga}</Text>

                <TouchableOpacity
                  onPress={this.props.changeModalVisibility}
                  style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: color2, borderRadius: 5}}>
                  <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Charge</Text>
                </TouchableOpacity>
            </Row>
            <Row style={{ backgroundColor: '#ffffff', justifyContent: 'center'}}>
              <View style={{ flex: 1, marginLeft: 100, marginRight:100}}>
                <Grid>
                  <Row style={{ height: 150 }}>
                    <Col size={1} style={{ padding: 30, paddingBottom: 0 }}>
                      <Text style={{fontSize: 20, fontFamily:'Roboto'}}>Cash</Text>
                    </Col>
                    <Col size={2} style={{ padding: 20, paddingBottom: 0 }}>

                      <TouchableOpacity
                        onPress={this.props.changeModalVisibility}
                        style={{ marginBottom: 10, width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: color1 }}>
                        <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Process</Text>
                      </TouchableOpacity>

                      <View style={{ height: 50, width: 300, borderRadius: 5, borderWidth: 1, borderColor: color1, justifyContent: 'center', padding: 2, paddingLeft: 10 }}>
                        <Text style={{fontSize: 15, fontFamily:'Roboto', color: 'grey' }}>Rp. {this.props.totalHarga}</Text>
                      </View>

                    </Col>
                  </Row>

                  <Row>
                    <Col size={1} style={{ padding: 30, paddingBottom: 0 }}>
                      <Text style={{fontSize: 20, fontFamily:'Roboto'}}>Card</Text>
                    </Col>
                    <Col size={2} style={{ padding: 20, paddingBottom: 0 }}>

                      <View style={{ height: 50, width: 300, borderRadius: 5, borderWidth: 1, borderColor: color1, justifyContent: 'center', alignItems:'center', padding: 2, paddingLeft: 10 }}>
                        <Form>
                          <Picker
                            note
                            mode="dropdown"
                            style={{ width: 280 }}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                          >
                            <Picker.Item label="Debit BCA" value="key0" />
                            <Picker.Item label="Debit Mandiri" value="key1" />
                            <Picker.Item label="Debit BNI" value="key2" />
                            <Picker.Item label="Kredit BCA" value="key3" />
                            <Picker.Item label="Kredit Mandiri" value="key4" />
                            <Picker.Item label="Kredit BNI" value="key5" />
                            <Picker.Item label="Undefined" value="key-1" />

                          </Picker>
                        </Form>

                      </View>
                      <View style={{ height: 50, width: 300, borderRadius: 5, borderWidth: 1, borderColor: color1, justifyContent: 'center', padding: 2, paddingLeft: 10, marginTop: 3 }}>
                          <Input placeholder="6 Digit Bank"
                            keyboardType="numeric"
                            onChangeText={(text)=> this.onChangeDigitBank(text)}
                          />
                      </View>


                    </Col>
                  </Row>
                </Grid>
              </View>
            </Row>
          </Grid>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formStyle: {
    margin: 10,
    paddingLeft: 10
  },
})
export default SimpleModal;
