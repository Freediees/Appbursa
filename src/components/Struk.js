import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Container, Header,Content, Footer, FooterTab, Button, Icon, Input } from 'native-base';
import { Row, Col, Grid} from 'react-native-easy-grid';
import { connect } from 'react-redux';

import { color1, color2, color3, color4, color5 } from './Color';

class Struk extends Component{

  renderTransaksi(item){
    //console.log(item);
    return(
      <Row key={item.id} style={{ borderBottomWidth: 1, marginBottom: 10 }}>
        <Col>
          <Row>
            <Col>
              <Text style={ [styles.textStyle, {color: color3, marginBottom: 5 }]}>#{item.index}: {item.item.name}</Text>
            </Col>
          </Row>
          <Row>
            <Col style={{ alignItems: 'flex-start'}}>
              <Text Text style={ [styles.textStyle, {color: color3, marginBottom: 5 }]}>{item.item.quantity} x Rp. {item.item.unit_price}</Text>
            </Col>
            <Col style={{ alignItems: 'flex-end'}}>
              <Text Text style={ [styles.textStyle, {color: color3, marginBottom: 5 }]}>Rp. {item.item.subtotal}</Text>
            </Col>
          </Row>
          <Row>
            <Col style={{ alignItems: 'flex-start'}}>
              <Text Text style={ [styles.textStyle, {color: color3, marginBottom: 5, fontWeight: 'bold' }]}>Total</Text>
            </Col>
            <Col style={{ alignItems: 'flex-end'}}>
              <Text Text style={ [styles.textStyle, {color: color3, marginBottom: 5, fontWeight: 'bold' }]}>Rp. {item.item.subtotal}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }


  render(){
    console.log(this.props.dataCustomer);
    return(
      <ScrollView>
        <View style={ [styles.viewStyle, {paddingBottom: 100}] }>
          <View>
            <Image source={require('./img/logo.png')} style={{ width: 250, height: 250 }} resizeMode={'contain'}/>
          </View>

          <View style={{ width: 500, justifyContent: 'flex-start' }}>
            <Text style={styles.textStyle}>Tanggal: </Text>
            <Text style={styles.textStyle}>Penjualan No : </Text>
            <Text style={styles.textStyle}>Penjualan Terkait : </Text>
            <Text style={styles.textStyle}>Konsumen : {this.props.dataCustomer.person}</Text>
          </View>


          <Grid style={{ width: 500, marginTop: 50 }}>
          <FlatList
            data={this.props.dataTransaksi}
            renderItem={(item)=>this.renderTransaksi(item)}
          />

          <Row style={{ marginTop: 20}}>
            <Col style={{ alignItems: 'flex-start'}}>
              <Text Text style={ [styles.textStyle, {color: color3, marginBottom: 5, fontWeight: 'bold' }]}>Grand Total</Text>
            </Col>
            <Col style={{ alignItems: 'flex-end'}}>
              <Text Text style={ [styles.textStyle, {color: color3, marginBottom: 5, fontWeight: 'bold' }]}>Rp. 200000 </Text>
            </Col>
          </Row>
          </Grid>

          <Text style={[styles.textStyle, {marginTop: 40}]}>Thank you for shopping with us, please come again</Text>

          <TouchableOpacity style={[styles.viewStyle, {backgroundColor: color1, borderRadius: 5, height: 50, width: 300, marginTop: 50 }]}
            onPress={()=> alert('Koneksikan Printer')}
          >
            <Text style={[styles.textStyle, {color: 'white'}]}>Cetak Struk</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.viewStyle, {backgroundColor: color3, borderRadius: 5, height: 50, width: 300, marginTop: 20 }]}
            onPress={()=> this.props.navigation.navigate('Home')}
          >
            <Text style={[styles.textStyle, {color: 'white'}]}>Kembali ke POS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'Roboto',
  }
})
function mapStateToProps(state){
  return {
    dataTransaksi: state.setDataTransaksi,
    dataLibrary: state.setDataList,
    setTotal: state.setTotal,
    dataCustomer: state.setDataCustomer,
  };
}

export default connect(mapStateToProps)(Struk);
