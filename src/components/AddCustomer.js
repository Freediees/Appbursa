import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Container, Form, Item, Label, Input, Button, Icon, DatePicker } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import { color1, color2, color3, color4, color5 } from './Color';

import axios from 'axios';

class AddCustomer extends Component {


  constructor(props){
    super(props);

    this.state = ({
      customer_group_id: 1,
    	company: "Bursasajadah",
    	person: "",
    	email: "",
    	phone: "",
    	address: "",
    	city: "",
      birth: "",
    })
  }
  backToHome = () =>{
      this.props.navigation.navigate('Home');
  }


  buttonSubmit = () => {
    console.log(this.state);

    if( this.state.person == "" || this.state.email == "" || this.state.phone == "" || this.state.address == ""){

      alert("Silahkan lengkapi data")

    }else{

      let data = {
        customer_group_id: 1,
      	company: 'Bursasajadah',
      	person: this.state.person,
      	email: this.state.email,
      	phone: this.state.phone,
      	address: this.state.address,
      	city: 'Bandung'
      }

      const opt = {
        headers: {'Content-Type': 'application/json', 'api-key':'kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s'},
        url: 'http://mpos.bursasajadah.com/api/v1/customers/',
        data: data,
        method: 'post'
      }


      console.log(opt);
      axios(opt)
      .then((res) =>
        { alert('Berhasil Menambahkan'); this.props.navigation.navigate('Home')}
      ).catch((error) => {
        console.log(error)
      });


    }


  }

  onChangeNama = text => {
    this.setState({
      person: text
    })
  }

  onChangeEmail = text => {
    this.setState({
      email: text
    })
  }

  onChangePhone = text => {
    this.setState({
      phone: text
    })
  }

  onChangeKota = text => {
    this.setState({
      city: text
    })
  }

  onChangeAddress(text){
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var tanggal = date + '/' + month + '/' + year;
    console.log(tanggal);

    this.setState({
      address: text
    })
  }


  render(){

    //console.log(this.state.person);

    return(
      <Container>
        <ScrollView>
        <Grid style={{ padding: 0, margin: 0}}>
          <Row style={{ height: 20}}>
            <Col style={{ width: 50, backgroundColor: color3, height: 70, justifyContent: 'center', alignItems: 'center' }} onPress={ this.backToHome }>

              <Icon type="AntDesign" name="left" style={{ color: 'white', fontSize: 30 }}/>

            </Col>
            <Col style={{ backgroundColor: color3, height: 70, justifyContent: 'center', alignItems: 'center' }}>

              <Text style={{ fontSize: 30, fontFamily: 'Roboto', color: 'white', fontWeight:'bold' }}>Add Customer</Text>

            </Col>
          </Row>

          <Row>
            <View style={{flex: 1, padding: 150, paddingTop: 100 }}>
              <Form>
                <Item floatingLabel>
                  <Label>Nama</Label>
                  <Input onChangeText={ text => this.onChangeNama(text) }/>
                </Item>
                <Item floatingLabel last>
                  <Label>Email</Label>
                  <Input onChangeText={ text => this.onChangeEmail(text) }/>
                </Item>
                <Item floatingLabel>
                  <Label>Telepon</Label>
                  <Input
                    keyboardType="numeric"
                    onChangeText = { text => this.onChangePhone(text) }
                  />
                </Item>
                <Item floatingLabel last>
                  <Label>Kota</Label>
                  <Input onChangeText={ text => this.onChangeKota(text) }/>
                </Item>
                <Item floatingLabel>
                  <Label>Alamat</Label>
                  <Input
                    onChangeText = { text => this.onChangeAddress(text) }
                  />
                </Item>
                {
                  <View
                  style={{ padding: 0, marginTop: 30,marginLeft: 5, borderBottomWidth: 0.5 }}>
                    <DatePicker
                    defaultDate={new Date(2018, 4, 4)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Tanggal Lahir"
                    textStyle={{ fontFamily: "Roboto" }}
                    placeHolderTextStyle={{ fontFamily: "Roboto" }}
                    //onDateChange={this.onChangeAddress}
                    disabled={false}
                    />
                  </View>
                }

              </Form>

              <Button style={{ width: '100%', marginTop: 100, borderRadius: 50, backgroundColor: color1, alignItems:'center', justifyContent: 'center' }} onPress={ this.buttonSubmit.bind(this) }>
                <Text style={{ color: 'white', fontFamily: 'Roboto', fontSize: 15 }}>Tambah</Text>
              </Button>
            </View>
          </Row>
        </Grid>
        </ScrollView>

      </Container>
    );
  }
}


export default AddCustomer;
