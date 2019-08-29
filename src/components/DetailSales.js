import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Icon, Left, Right, Body } from 'native-base';

import { color1, color2, color3, color4, color5 } from './Color';

class List extends Component{
  render(){
    return(
      <ListItem icon>
        <Left>
            <Icon name={this.props.icons} />
        </Left>
        <Body>
          <Text>{this.props.judul}</Text>
        </Body>
        <Right>
          <Text>{this.props.value}</Text>
        </Right>
      </ListItem>
    );
  }
}

class DetailSales extends Component{

  render(){
      //console.log(this.props);

      const datareal = this.props.data;
      return(
        <View style={ styles.viewStyles }>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1}}>
            <View style = {styles.buttonStyle}>
              <Text style={[ styles.text, { color: 'white'}]}>Refund</Text>
            </View>
            <View style = {styles.buttonStyle}>
              <Text style={[ styles.text, { color: 'white'}]}>Kirim Invoice</Text>
            </View>
            <View style = {styles.buttonStyle}>
              <Text style={[ styles.text, { color: 'white'}]}>Cetak Invoice</Text>
            </View>
          </View>
          <Text style={ [styles.teks], {padding: 10} }>Details</Text>

          <View style={ styles.content }>
              <List icons="home" judul="Payment Method" value={datareal.payment_method || ""}/>
              <List icons="wifi" judul="Invoice" value={datareal.reference_no}/>
              <List icons="call" judul="Time of Purchase" value={datareal.date}/>
              <List icons="cart" judul="Due In" value={datareal.due_date || ""}/>
              <List icons="calculator" judul="Status" value={datareal.sale_status}/>
              <List icons="paper" judul="Customer" value={datareal.customer}/>
              <List icons="ios-add" judul="Grand Total" value={datareal.grand_total}/>
          </View>
        </View>
      );
  }
}

export default DetailSales;

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    width: '100%',
    paddingTop: 0,
  },
  header: {
    width: '100%',
    flexDirection:'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    paddingBottom: 20
  },
  button: {
    borderColor: 'green',
    borderWidth: 1,
    width: 140,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  teks: {
    fontSize: 15,
    fontFamily: 'Roboto'
  },
  content: {
    borderTopWidth: 1,
    paddingTop: 10,
    borderTopWidth: 1
  },
  buttonStyle: {
    backgroundColor:  color3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 100,
    borderRadius: 5
  }
});
