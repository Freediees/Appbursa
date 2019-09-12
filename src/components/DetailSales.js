import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ListItem, Icon, Left, Right, Body } from 'native-base';

import { color1, color2, color3, color4, color5 } from './Color';

class List extends Component{



  componentDidMount(){
    //console.log(this.props);
  }
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

  constructor(props){
    super(props)
    this.state = {
      refund: false
    }
  }

  componentDidMount(){

    this.setState({
      refund: false
    })
  }



  renderRefund =()=> {

    //console.log(this.state.refund);

    let cik = <Text></Text>

    if(this.state.refund){
      cik = <View style={{ marginLeft: 20, width: 100, height: 40, backgroundColor: color3, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 5 }}><Text style={ [styles.textStyle], { color: 'white'} }>Refund</Text></View>
    }else{
      cik = <Text style={ [styles.textStyle], {marginLeft: 20} }></Text>
    }

    return cik;
  }

  renderDataItem(data){

    //console.log(data);

    let a = data.map(item=>{

    return(
    <View key={item.product_id} style={{ margin: 10, marginBottom: 20 }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={ styles.textStyle }>{item.product_name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Text style={ styles.textStyle }>{item.unit_price}</Text>
          {this.renderRefund()}
        </View>

      </View>
    </View>
    )

    });

    return a;

  }

  onPressButton = () => {
    this.setState({
      refund: !this.state.refund
    })
  }
  render(){
      //console.log(this.props);

      const datareal = this.props.data;


      console.log(datareal.items);

      return(
        <ScrollView style={ styles.viewStyles }>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1}}>
            <TouchableOpacity style = {styles.buttonStyle} onPress={ this.onPressButton.bind()}>
              <Text style={[ styles.text, { color: 'white'}]}>Refund</Text>
            </TouchableOpacity>
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

          <View style={{ borderTopWidth: 1, borderBottomWidth: 1, marginTop: 10, marginBottom: 10}}>
            <Text style={ [styles.teks], {padding: 10} }>Product</Text>
          </View>

          <View>
            {this.renderDataItem(datareal.items || [])}
          </View>
        </ScrollView>
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
