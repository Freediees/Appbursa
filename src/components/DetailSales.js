import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Icon, Left, Right, Body } from 'native-base';

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
    borderTopWidth: 1,
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
  }
});
