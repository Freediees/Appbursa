import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList } from 'react-native';
import { Card, Left, Right, Body, CardItem, Container, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';

import axios from 'axios';

const dataList = [
  {name: "Transaksi 1"},
  {name: "Transaksi 2"},
  {name: "Transaksi 3"},
]

class Activity extends Component{

  constructor(props){
    super(props);

    this.state=({
      dataList: [],
    })
  }

  componentDidMount(){
    axios.get("http://mpos.bursasajadah.com/api/v1/sales?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s")
      .then(
        (res) => { this.setState({ dataList: res.data.data }) }
      );
  }

  renderItem(item){
    //console.log(item);
    return(
      <View>
        <View style={{ padding: 10, backgroundColor: '#92d66f' }}>
          <Text>Mon, 15 Juli 2019</Text>
        </View>
        <Grid>
          <Col style={{ width: 55, height: 55, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="paper" />
          </Col>
          <Col>
            <Row>
              <Col size={3} style={{ justifyContent: 'flex-end'}}>
                <Text style={{ fontSize: 17, fontFamily: 'Roboto', fontWeight: 'bold' }}>Rp.{item.item.grand_total}</Text>
              </Col>
              <Col size={1} style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 10}}>
                <Text>Done</Text>
              </Col>
            </Row>
            <Row>
              <Text>Rp.{item.item.sale_status}</Text>
            </Row>
          </Col>
        </Grid>
      </View>
    );
  }

  render(){
    console.log(this.state.dataList);

    return(
      <Container>
        <View style={{ height: 70, backgroundColor: '#92d66f', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, fontFamily: 'Roboto', color: 'white', fontWeight:'bold' }}>ACTIVITY</Text>
        </View>
        <Grid>
          <Row>
            <Col size={1} style={{ backgroundColor: '#ffffff', padding: 0, borderRightWidth: 2, borderColor: '#92d66f' }}>
              <View style={{ padding: 5, margin: 2, backgroundColor: 'white', height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>Search</Text>
              </View>
              <FlatList
                data={this.state.dataList}
                renderItem={(item)=>this.renderItem(item)}
              />
            </Col>
            <Col size={2} style={{ padding: 16, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Detail Activity</Text>
            </Col>
          </Row>
        </Grid>

        <View style={{ height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Grid>
            <Row>
              <Col style={{ backgroundColor: '#92d66f', width: 80}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', paddingLeft: 20 }} onPress={()=> this.props.navigation.openDrawer()}>
                  <Icon type="Entypo" name="menu" style={{ color: 'white', fontSize: 40}} />
                </TouchableOpacity>
              </Col>
              <Col style={{ backgroundColor: '#92d66f'}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.props.navigation.navigate('Favorites')} }>
                  <Icon type="Ionicons" name="md-star" style={{ color: 'white', fontSize: 40}} />
                  <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Favorites</Text>
                </TouchableOpacity>
              </Col>
              <Col style={{ backgroundColor: '#7ab55c'}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Icon type="Entypo" name="list" style={{ color: 'white', fontSize: 40}}/>
                  <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Library</Text>
                </TouchableOpacity>
              </Col>
              <Col style={{ backgroundColor: '#92d66f'}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.props.navigation.navigate('Manual')} }>
                  <Icon type="Ionicons" name="md-calculator" style={{ color: 'white', fontSize: 40}}/>
                  <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Manual</Text>
                </TouchableOpacity>
              </Col>
            </Row>
          </Grid>
        </View>


      </Container>
    );
  }
}

export default connect()(Activity);
