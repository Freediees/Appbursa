import React, {Component} from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Card, Left, Right, Body, CardItem, Form, Picker, Item, Label, Input, Toast } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import { connect } from 'react-redux';

import { setPayment, updatePayment, deletePayment } from '../actions';

import { color1, color2, color3, color4, color5, red } from './Color';


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class SimpleModal extends Component{
  constructor(props){
    super(props);
    this.state=({
      lebar: Dimensions.get('window').width - 180,
      tinggi: Dimensions.get('window').height - 180,
      selected: "key-1",
      digitBank: '',
      totalData: 1,
      bayarCash: 0,
      kembalian: this.props.dataGeneral.totalDiskon * -1,
      headerCheckout: 0,
    })
  }

  onValueChange(value, index) {
    //console.log(value);
    //console.log(index);
  }

  onChangeDigitBank(text, item, z){

    //console.log(text);
    //console.log(item);

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


    let arr = item;
    arr.cc_no = text;

    this.props.updatePayment(arr);

  }

  onTypeChange = (index, value) => {

    //console.log(value);

    let arr = index;

    arr.amount= 0;
    arr.cc_no= '';
    arr.cc_type= -1;
    arr.id_pay = value;

    let paying_by = '';
    if(value==0){
      paying_by= 'Cash'
    }else if(value== 1){
      paying_by = 'Card'
    }

    arr.paying_by = paying_by;

    this.props.updatePayment(arr);

  }


  onDeletePayment = (index) => {


    var arr = this.props.payment;

    if(arr.length > 1){
      var arr2 = []
      for(i=0;i<arr.length;i++){
        if(i != index){
          let a = arr[i];
          a.index = i;
          arr2.push(a);
        }
      }
      this.props.deletePayment(arr2);

    }else{
      alert('Minimal 1 Pembayaran');
    }

  }

  onCashChange(value, item, z){

    let arr = item;
    arr.amount = value;

    let a = this.hitungTotal();
    let b = (this.props.dataGeneral.totalDiskon * -1) + a;
    this.setState({
      kembalian: b
    })
    //console.log(a);

    this.props.updatePayment(arr);


  }

  renderPayment(item, index){
    //console.log(item);
    switch(item.id_pay){
      case 0:

      //console.log(item);

      return(
      <View style={{ borderBottomWidth: 1 , borderColor: color3 }}>
      <Row>
        <Col style={{ padding: 20, paddingBottom: 0 }}>
        <View style={{ height: 50 , width: 300, borderRadius: 5, borderWidth: 1, borderColor: color1, justifyContent: 'center', alignItems:'center', padding: 2, paddingLeft: 10, marginBottom: 10 }}>
          <Form>
            <Picker
              note
              mode="dropdown"
              style={{ width: 280 }}
              selectedValue= {item.id_pay}
              onValueChange={this.onTypeChange.bind(this, item)}
            >
              <Picker.Item label="Cash" value={0} />
              <Picker.Item label="Card" value={1} />

            </Picker>
          </Form>

        </View>

          <View style={{ height: 50, width: 300, borderRadius: 5, borderWidth: 1, borderColor: color1, justifyContent: 'center', padding: 2, paddingLeft: 10, marginBottom: 10 }}>
              <Input placeholder="Nominal"
                keyboardType="numeric"
                onChangeText={( text )=> this.onCashChange(text, item) }
              />
          </View>
        </Col>
        <Col style={{ padding: 20}}>
          <TouchableOpacity style={{ height: 50, backgroundColor: red, justifyContent: 'center', alignItems: 'center', borderRadius: 5}} onPress={this.onDeletePayment.bind(this, item.index)}>
              <Text style={styles.textStyle}>Hapus</Text>
          </TouchableOpacity>
        </Col>
      </Row>
      </View>
      );

      break;

      case 1:

      //console.log(item);
      return(
        <View style={{ borderBottomWidth: 1 , borderColor: color3 }}>
          <Row>
          <Col style={{ padding: 20, paddingBottom: 0 }}>

          <View style={{ height: 50 , width: 300, borderRadius: 5, borderWidth: 1, borderColor: color1, justifyContent: 'center', alignItems:'center', padding: 2, paddingLeft: 10, marginBottom: 10 }}>
            <Form>
              <Picker
                note
                mode="dropdown"
                style={{ width: 280 }}
                selectedValue= {item.id_pay}
                onValueChange={this.onTypeChange.bind(this, item)}
              >
                <Picker.Item label="Cash" value={0} />
                <Picker.Item label="Card" value={1} />

              </Picker>
            </Form>

          </View>

            <View style={{ height: 50, width: 300, borderRadius: 5, borderWidth: 1, borderColor: color1, justifyContent: 'center', alignItems:'center', padding: 2, paddingLeft: 10 }}>
              <Form>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 280 }}
                  selectedValue={item.cc_type}
                  onValueChange={this.onValueChange.bind(this)}
                  enabled={false}
                >
                  <Picker.Item label="Debit BCA" value={0} />
                  <Picker.Item label="Debit Mandiri" value={1} />
                  <Picker.Item label="Debit BNI" value={2} />
                  <Picker.Item label="Kredit BCA" value={3} />
                  <Picker.Item label="Kredit Mandiri" value={4} />
                  <Picker.Item label="Kredit BNI" value={5} />
                  <Picker.Item label="Undefined" value={-1} />

                </Picker>
              </Form>

            </View>
            <View style={{ height: 50, width: 300, borderRadius: 5, borderWidth: 1, borderColor: color1, justifyContent: 'center', padding: 2, paddingLeft: 10, marginTop: 10 }}>
                <Input placeholder="6 Digit Bank"
                  keyboardType="numeric"
                  onChangeText={(text)=> this.onChangeDigitBank(text, item)}
                />
            </View>
            <View style={{ height: 50, width: 300, borderRadius: 5, borderWidth: 1, borderColor: color1, justifyContent: 'center', padding: 2, paddingLeft: 10, marginTop: 10, marginBottom: 10 }}>
                <Input placeholder="Nominal"
                  keyboardType="numeric"
                  onChangeText={( text )=> this.onCashChange(text, item) }
                />
            </View>


          </Col>

          <Col style={{ padding: 20}}>
            <TouchableOpacity style={{ height: 50, backgroundColor: red, justifyContent: 'center', alignItems: 'center', borderRadius: 5}} onPress={this.onDeletePayment.bind(this, item.index)}>
                <Text style={styles.textStyle}>Hapus</Text>
            </TouchableOpacity>
          </Col>

          </Row>
        </View>
      );

      break;

      default:
        return <View></View>
      break;
    }

  }

  renderPayment1 = () => {
    return this.props.payment.map((item)=>
      this.renderPayment(item, this.props.payment.id_pay)
    );
  }

  onTambahPembayaran = () => {

    let data = {
      index: 0,
      id_pay: 0,
      paying_by: 'Cash',
      payment_reference_no: '',
      amount:0,
      cheque_no: '',
      gift_card_no: '',
      cc_no: '',
      cc_holder: '',
      cc_month: '',
      cc_year: '',
      cc_type: -1,
      note: '',
    }

    this.props.setPayment(data);


  }

  hitungTotal(){
    let a = this.props.payment.length;
    //console.log(a);

    let kembalians = 0;
    let i = 0;
    for(i=0;i<a;i++){
      //console.log(this.props.payment[i].amount);
      kembalians = kembalians + parseInt(this.props.payment[i].amount, 10);
    }

    return kembalians;
  }

  onCharge1(){
    if(this.state.kembalian != 0){
      Toast.show({
        text: 'Harga Belum Balance',
        buttonText: 'OK'
      });
    }else{
      this.setState({
        headerCheckout: 1
      })
    }
  }

  onCharge(){

      //console.log(this.props.dataCustomer);
      //console.log(this.props.dataTransaksi);
      //console.log(this.props.payment);

      let reference_no = 'POS/INHOFTANK/1';
      let biller_id = 1;
      let customer_id = 1;
      let warehouse_id = 1;
      let total_item = this.props.dataTransaksi.length;
      let sale_status = "complete";
      let payment_status = "paid";
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds

      var tanggal = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;

      //console.log(tanggal);

      this.props.navigation.navigate('Struk');
  }


  render(){
    console.log(this.props.dataGeneral.totalDiskon);
    let headerCheckout = <View></View>
    let sisa = <Text style={{ fontSize: 20, fontFamily:'Roboto' }}>Sisa : Rp. {numberWithCommas(this.state.kembalian)}</Text>
    if(this.state.kembalian < 0){
      sisa = <Text style={{ fontSize: 20, fontFamily:'Roboto', color: red }}>Sisa : Rp. {numberWithCommas(this.state.kembalian)}</Text>
    }

    if(this.state.headerCheckout == 0){
    headerCheckout = <Row style={{ height: 100, backgroundColor: '#ffffff', padding: 20, justifyContent: 'space-between', alignItems: 'center', borderColor: color1, borderBottomWidth: 1 }}>
        <TouchableOpacity
          onPress={this.props.changeModalVisibility}
          style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor:red}}>
          <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Batal</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontFamily:'Roboto' }}>Total Harga : Rp. {numberWithCommas(this.props.dataGeneral.totalDiskon)}</Text>
        {sisa}

        <TouchableOpacity
          onPress={()=> {this.onCharge1()}}
          style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: color2, borderRadius: 5}}>
          <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Bayar</Text>
        </TouchableOpacity>
    </Row>

  }else{
    headerCheckout = <Row style={{ height: 100, backgroundColor: '#ffffff', padding: 20, justifyContent: 'flex-end', alignItems: 'center', borderColor: color1, borderBottomWidth: 1 }}>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontFamily:'Roboto', alignItems: 'center' }}>Anda Yakin Untuk Melanjutkan? </Text>
        </View>
        <TouchableOpacity
          onPress={()=> {this.setState({ headerCheckout: 0 })}}
          style={{ margin: 10,width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor:red}}>
          <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Batal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=> {this.onCharge()}}
          style={{ margin: 10, width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: color2, borderRadius: 5}}>
          <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Lanjutkan</Text>
        </TouchableOpacity>
    </Row>
  }


    //console.log( this.props.payment );
    //console.log(this.state.kembalian);

    //console.log( this.props.dataCustomer );

    return(
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={{ width: this.state.lebar, height: this.state.tinggi, backgroundColor: 'white'}}>
          <Grid style={{ flex: 1}}>
            {headerCheckout}
            <Row style={{ backgroundColor: '#ffffff', justifyContent: 'center'}}>
              <ScrollView style={{ flex: 1, marginLeft: 100, marginRight:100}}>

                  {this.renderPayment1()}

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

function mapStateToProps(state){
  return {
    dataTransaksi: state.setDataTransaksi,
    dataLibrary: state.setDataList,
    setTotal: state.setTotal,
    dataCustomer: state.setDataCustomer,
    payment: state.setPayment,
    dataGeneral: state.setGeneral,
  };
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
export default connect(mapStateToProps,{ setPayment, updatePayment, deletePayment })(SimpleModal);
