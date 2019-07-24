import React, {Component} from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Left, Right, Body, CardItem} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

class SimpleModal extends Component{
  constructor(props){
    super(props);
    this.state=({
      lebar: Dimensions.get('window').width - 180,
      tinggi: Dimensions.get('window').height - 180
    })
  }

  render(){

    return(
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={{ width: this.state.lebar, height: this.state.tinggi, backgroundColor: 'white'}}>
          <Grid style={{ flex: 1}}>
            <Row style={{ height: 100, backgroundColor: '#ffffff', padding: 20, justifyContent: 'space-between', borderColor: 'grey', borderBottomWidth: 1 }}>
                <TouchableOpacity
                  onPress={this.props.changeModalVisibility}
                  style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor:'#ff4242'}}>
                  <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Cancel</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 30, fontFamily:'Roboto' }}>Rp. {this.props.totalHarga}</Text>

                <TouchableOpacity
                  onPress={this.props.changeModalVisibility}
                  style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#d3ed95', borderRadius: 5}}>
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
                        style={{ marginBottom: 10, width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#d3ed95' }}>
                        <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Process</Text>
                      </TouchableOpacity>

                      <View style={{ height: 50, width: 300, borderRadius: 5, borderWidth: 1, borderColor: '#d3ed95', justifyContent: 'center', padding: 2, paddingLeft: 10 }}>
                        <Text style={{fontSize: 15, fontFamily:'Roboto', color: 'grey' }}>Rp. {this.props.totalHarga}</Text>
                      </View>

                    </Col>
                  </Row>

                  <Row>
                    <Col size={1} style={{ padding: 30, paddingBottom: 0 }}>
                      <Text style={{fontSize: 20, fontFamily:'Roboto'}}>Card</Text>
                    </Col>
                    <Col size={2} style={{ padding: 20, paddingBottom: 0 }}>

                      <View style={{ height: 50, width: 300, borderRadius: 5, borderWidth: 1, borderColor: '#d3ed95', justifyContent: 'center', alignItems:'center', padding: 2, paddingLeft: 10 }}>
                        <Text style={{fontSize: 15, fontFamily:'Roboto', color: 'grey' }}>Insert Card Detail</Text>
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

export default SimpleModal;
