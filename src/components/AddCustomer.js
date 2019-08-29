import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Form, Item, Label, Input, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import { color1, color2, color3, color4, color5 } from './Color';

class AddCustomer extends Component {

  backToHome = () =>{
      this.props.navigation.navigate('Home');
  }


  render(){
    return(
      <Container>

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
            <View style={{flex: 1, padding: 150 }}>
              <Form>
                <Item floatingLabel>
                  <Label>Name</Label>
                  <Input />
                </Item>
                <Item floatingLabel last>
                  <Label>Email</Label>
                  <Input />
                </Item>
                <Item floatingLabel>
                  <Label>Phone</Label>
                  <Input />
                </Item>
                <Item floatingLabel last>
                  <Label>Birth Date</Label>
                  <Input />
                </Item>
              </Form>

              <Button style={{ width: '100%', marginTop: 100, borderRadius: 50, backgroundColor: color1, alignItems:'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'Roboto', fontSize: 15 }}>Tambah</Text>
              </Button>
            </View>
          </Row>
        </Grid>


      </Container>
    );
  }
}


export default AddCustomer;
