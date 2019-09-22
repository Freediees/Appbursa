import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Card, Left, Right, Body, CardItem, Container, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';

import { getDataSales, testThunk, getDetails } from '../actions';

import axios from 'axios';

import DetailSales from './DetailSales';
import { color1, color2, color3, color4, color5 } from './Color';

const data = [
  {id: 1, nama_barang: 'Sajadah', alert: 1, stock: 100},
  {id: 2, nama_barang: 'Mukena', alert: 2, stock: 20},
]

class Activity extends Component{

  constructor(props){
    super(props);

    this.state=({
      dataList: [],
    })
  }

  componentDidMount(){

  }

  renderItem(res){
    //console.log(res)
    return(
      <Row style={{ height: 30, margin: 3 }} key={res.id}>
        <Col style={ styles.colStyle }>
          <Text style={ styles.textStyle }>{res.nama_barang}</Text>
        </Col>

        <Col style={ styles.colStyle }>
          <Text style={ styles.textStyle }>{res.stock}</Text>
        </Col>

        <Col style={ styles.colStyle }>
          <Text style={ styles.textStyle }>{res.alert}</Text>
        </Col>
      </Row>
    );
  }

  testLoop = () => {
    return data.map(res=> this.renderItem(res));
  }




  render(){
    //console.log(this.props.dataDetail);

    let kirimData = this.props.dataDetail

    //console.log(this.props.dataSales.transaksi.data);

    let konten =<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}><Text>Tunggu Sebentars</Text>
    <ActivityIndicator size="large" /></View>

    let konten2 = konten;

    if(this.props.dataSales.isFetching == false){
      konten = <FlatList
        data={this.props.dataSales.transaksi.data}
        renderItem={(item)=>this.renderItem(item)}
      />

      konten2 = <DetailSales data={kirimData || this.props.dataSales.transaksi.data}/>
    }


    const a = <Text>Hello</Text>

    return(
      <Container>
        <View style={{ height: 70, backgroundColor: color3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, fontFamily: 'Roboto', color: 'white', fontWeight:'bold' }}>INVENTORY</Text>
        </View>
        <Grid>
            <Row style={{ borderBottomWidth: 1, height: 40}}>
              <Col style={ styles.colStyle }>
                <Text style={ styles.textStyle }>Nama Barang</Text>
              </Col>

              <Col style={ styles.colStyle }>
                <Text style={ styles.textStyle }>Jumlah Stock</Text>
              </Col>

              <Col style={ styles.colStyle }>
                <Text style={ styles.textStyle }>Alert</Text>
              </Col>
            </Row>

            <Row>
              <Col>
                { this.testLoop() }
              </Col>
            </Row>

        </Grid>

        <View style={{ height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Grid>
            <Row>
              <Col style={{ backgroundColor: color2, width: 80}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', paddingLeft: 20 }} onPress={()=> this.props.navigation.openDrawer()}>
                  <Icon type="Entypo" name="menu" style={{ color: 'white', fontSize: 40}} />
                </TouchableOpacity>
              </Col>
              <Col style={{ backgroundColor: color3, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 30, fontFamily: 'Roboto', color: 'white', fontWeight:'bold' }}>BURSASAJADAH</Text>
              </Col>

            </Row>
          </Grid>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  colStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  textStyle: {
    fontFamily: 'Roboto',
    color: 'grey'
  }
})


export default connect(mapStateToProps,{ testThunk, getDetails })(Activity);

function mapStateToProps(state){
  return{
    dataSales: state.setGetDataSales,
    dataDetail: state.setDataDetail,
  };
}
