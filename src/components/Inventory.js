import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Container, Icon } from 'native-base';


const data = [
  {name: "Data 1", price: 12000, id: 1, varian: "Varian 1", stock: 10, alert: 5},
  {name: "Data 2", price: 100000, id: 2, varian: "Varian 2", stock: 100, alert: 2},
  {name: "Data 3", price: 50000, id: 3, varian: "Varian 3", stock: 5, alert: 1},
  {name: "Data 1", price: 12000, id: 1, varian: "Varian 1", stock: 10, alert: 5},
  {name: "Data 2", price: 100000, id: 2, varian: "Varian 2", stock: 100, alert: 2},
  {name: "Data 3", price: 50000, id: 3, varian: "Varian 3", stock: 5, alert: 1},
  {name: "Data 1", price: 12000, id: 1, varian: "Varian 1", stock: 10, alert: 5},
  {name: "Data 2", price: 100000, id: 2, varian: "Varian 2", stock: 100, alert: 2},
  {name: "Data 3", price: 50000, id: 3, varian: "Varian 3", stock: 5, alert: 1},
  {name: "Data 1", price: 12000, id: 1, varian: "Varian 1", stock: 10, alert: 5},
  {name: "Data 2", price: 100000, id: 2, varian: "Varian 2", stock: 100, alert: 2},
  {name: "Data 3", price: 50000, id: 3, varian: "Varian 3", stock: 5, alert: 1},
];


class Inventory extends Component {

  renderItem(item){
    return(
      <TouchableOpacity style={{ padding: 10, marginBottom: 10, justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9EDEC" }}>
        <Text style={styles.text}>{item.item.name}</Text>
        <Text style={styles.text}>{item.item.varian}</Text>
        <Text style={styles.text}>{item.item.stock}</Text>
        <Text style={styles.text}>{item.item.alert}</Text>
      </TouchableOpacity>
    );
  }


  render(){
    return(
      <Container style={{ backgroundColor: '#E9EDEC', paddingTop: 20 }}>
        <Grid style={{ margin: 10}}>
          <Row style={{ height: 50 }}>
            <Col size={1} style={{ backgroundColor: '#ffffff', margin: 5}}>
              <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 8 }}>
                <Text style={ styles.text }>Item Library</Text>
              </View>
            </Col>
            <Col size={2} style={{ backgroundColor: '#ffffff', margin: 5}}>
              <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 8, paddingRight: 8}}>
                <Text style={styles.text}>Search</Text>
                <Icon style={styles.text} name="search" />
              </View>
            </Col>
          </Row>
          <Row>
            <Col style={{ backgroundColor: '#ffffff', margin: 5}}>
              <Row style={{ height: 60 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems:'center', borderColor: 'grey', borderBottomWidth: 1, marginRight: 10, marginLeft: 10}}>
                  <Text style={{ fontSize: 25, fontFamily:'Roboto', color: 'grey' }}>Inventory</Text>
                </View>
              </Row>
              <Row style={{ height: 30, borderColor: 'grey', borderBottomWidth: 1, marginRight: 10, marginLeft: 10 }}>
                <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.text}>ITEM NAME</Text>
                </Col>
                <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.text}>VARIANT</Text>
                </Col>
                <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.text}>IN STOCK</Text>
                </Col>
                <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.text}>STOCK ALERT</Text>
                </Col>
              </Row>
              <Row style={{ padding: 10, backgroundColor: '#ffffff'}}>
                <FlatList
                  data={data}
                  renderItem={(item)=>this.renderItem(item)}
                />
              </Row>
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{ fontFamily: "Roboto", fontSize: 30, color: 'white'}}>BURSA SAJADAH</Text>
                </View>
              </Col>
            </Row>
          </Grid>
        </View>
      </Container>
    );
  }
}

export default Inventory;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: 'grey',
  }
});
