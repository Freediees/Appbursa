import React, {Component} from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Card, Left, Right, Body, CardItem, Form, Picker, Item, Label, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import { color1, color2, color3, color4, color5 } from './Color';

class SimpleModal extends Component{
  constructor(props){
    super(props);
    this.state=({
      lebar: Dimensions.get('window').width - 180,
      tinggi: Dimensions.get('window').height - 180,
      selected: "key-1",
      digitBank: '',
      valueType: ['0'],
      totalData: 1,
      bayarCash: 0,
      kembalian: this.props.totalHarga * -1,
      listPayment: [
        {
          index: 0,
          paying_by: 'cash',
          payment_reference_no: '',
          amount:'',
          cheque_no: '',
          gift_card_no: '',
          cc_no: '',
          cc_holder: '',
          cc_month: '',
          cc_year: '',
          cc_type: '',
          note: '',
        }
      ],
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

  onTypeChange = (index) => {

    //console.log(this.state.valueType[0]);

    let a = this.state.valueType;
    a[0] = index;

    this.setState({
      valueType: a
    });
  }

  onCashChange(value, z){

    //console.log(z);
    //console.log(value);

    let a = value - this.props.totalHarga;

    this.setState({
      kembalian: a,
      bayarCash: value
    })
  }

  renderPayment(item, index){

    switch(index){
      case "0":

      //console.log(item);
      return(
      <View style={{ borderBottomWidth: 1 , borderColor: color3 }}>
        <Col style={{ padding: 20, paddingBottom: 0 }}>

        <View style={{ height: 50 , width: 300, borderRadius: 5, borderWidth: 1, borderColor: color1, justifyContent: 'center', alignItems:'center', padding: 2, paddingLeft: 10, marginBottom: 10 }}>
          <Form>
            <Picker
              note
              mode="dropdown"
              style={{ width: 280 }}
              selectedValue= {this.state.valueType[0]}
              onValueChange={this.onTypeChange.bind(this)}
            >
              <Picker.Item label="Cash" value="0" />
              <Picker.Item label="Card" value="1" />

            </Picker>
          </Form>

        </View>

          <View style={{ height: 50, width: 300, borderRadius: 5, borderWidth: 1, borderColor: color1, justifyContent: 'center', padding: 2, paddingLeft: 10, marginBottom: 10 }}>
              <Input placeholder="Nominal"
                keyboardType="numeric"
                onChangeText={( text )=> this.onCashChange(text) }
              />
          </View>



        </Col>
      </View>
      );

      break;

      case "1":

      //console.log(item);
      return(
        <View style={{ borderBottomWidth: 1 , borderColor: color3 }}>
          <Col size={2} style={{ padding: 20, paddingBottom: 0 }}>

          <View style={{ height: 50 , width: 300, borderRadius: 5, borderWidth: 1, borderColor: color1, justifyContent: 'center', alignItems:'center', padding: 2, paddingLeft: 10, marginBottom: 10 }}>
            <Form>
              <Picker
                note
                mode="dropdown"
                style={{ width: 280 }}
                selectedValue= {this.state.valueType[0]}
                onValueChange={this.onTypeChange.bind(this)}
              >
                <Picker.Item label="Cash" value="0" />
                <Picker.Item label="Card" value="1" />

              </Picker>
            </Form>

          </View>

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
            <View style={{ height: 50, width: 300, borderRadius: 5, borderWidth: 1, borderColor: color1, justifyContent: 'center', padding: 2, paddingLeft: 10, marginTop: 10 }}>
                <Input placeholder="6 Digit Bank"
                  keyboardType="numeric"
                  onChangeText={(text)=> this.onChangeDigitBank(text)}
                />
            </View>
            <View style={{ height: 50, width: 300, borderRadius: 5, borderWidth: 1, borderColor: color1, justifyContent: 'center', padding: 2, paddingLeft: 10, marginTop: 10, marginBottom: 10 }}>
                <Input placeholder="Nominal"
                  keyboardType="numeric"
                />
            </View>


          </Col>
        </View>
      );

      break;

      default:
        return <View></View>
      break;
    }

  }

  renderPayment1 = (index) => {
    return this.state.listPayment.map((item)=>
      this.renderPayment(item, index)
    );
  }

  onTambahPembayaran = () => {

    let data = {
      index: this.state.totalData,
      paying_by: 'cash',
      payment_reference_no: '',
      amount:'',
      cheque_no: '',
      gift_card_no: '',
      cc_no: '',
      cc_holder: '',
      cc_month: '',
      cc_year: '',
      cc_type: '',
      note: '',
    }

    let a = this.state.valueType;
    a.push('0');

    let listBayar = this.state.listPayment;

    listBayar.push(data);

    this.setState({
      listPayment: listBayar,
      valueType: a,
      totalData: this.state.totalData + 1,
    });

  }

  render(){

    //console.log( this.state.valueType );
    return(
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={{ width: this.state.lebar, height: this.state.tinggi, backgroundColor: 'white'}}>
          <Grid style={{ flex: 1}}>
            <Row style={{ height: 100, backgroundColor: '#ffffff', padding: 20, justifyContent: 'space-between', alignItems: 'center', borderColor: color1, borderBottomWidth: 1 }}>
                <TouchableOpacity
                  onPress={this.props.changeModalVisibility}
                  style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor:color1}}>
                  <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Cancel</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 20, fontFamily:'Roboto' }}>Total Harga : Rp. {this.props.totalHarga}</Text>
                <Text style={{ fontSize: 20, fontFamily:'Roboto' }}>Kembalian : Rp. {this.state.kembalian}</Text>

                <TouchableOpacity
                  onPress={()=> {this.props.navigation.navigate('Struk')}}
                  style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: color2, borderRadius: 5}}>
                  <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Charge</Text>
                </TouchableOpacity>
            </Row>
            <Row style={{ backgroundColor: '#ffffff', justifyContent: 'center'}}>
              <ScrollView style={{ flex: 1, marginLeft: 100, marginRight:100}}>

                  {this.renderPayment1(this.state.valueType[0])}

                  <View style={{ height: 120, marginTop: 20 }}>
                    <TouchableOpacity style={{ height: 50, width: '100%', backgroundColor: color3, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={ this.onTambahPembayaran.bind(this) }>
                      <Text style={ styles.textStyle }>Tambah Pembayaran</Text>
                    </TouchableOpacity>
                  </View>

              </ScrollView>
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
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Roboto'
  }
})
export default SimpleModal;
