import React, { Component} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, AsyncStorage } from 'react-native';
import { Container, Header,Content, Footer, FooterTab, Button, Icon, Input } from 'native-base';
import { Row, Col, Grid} from 'react-native-easy-grid';
import { connect } from 'react-redux';
import axios from 'axios';
import { tambahData, tambahLibrary, tambahTotal, resetData, removeTransaksiById, removeDataTransaksi, plusOne, minusOne, cariBarang } from '../actions';
import SimpleModal from './SimpleModal';
import ModalSPG from './ModalSpgDiskon';
import ModalSimpanBill from './ModalSimpanBill';
import ModalListBill from './ModalListBill';
import ModalCustomer from './ModalCustomer';
import ModalDiskon from  './ModalDiskon';

const data=[
  {key:"Jason1"},
  {key:"Jason2"},
  {key:"Jason3"},
];

let totalNilai = 0;

import { color1, color2, color3, color4, color5 } from './Color';


class Home extends Component{

  constructor(props){
    super(props)
    link_url = "http://mpos.bursasajadah.com/api/v1/products?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s";
    this.state= {
      data: [],
      transaksi: [],
      isModalVisible: false,
      testModal: <View></View>,
      tempBill: [],
      indexTemp: '',
      diskon: 0
    }
  }

  componentDidMount(){

    //console.log('sini');
    this._getData();

    axios.get("http://mpos.bursasajadah.com/api/v1/products?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s")
      .then(
        (res)=>{

          this.props.tambahLibrary(res);

        }
      )
      .catch((error) => {
          console.log(error);
      });
  }

  onSetDiskon = (value) => {

    //console.log('beres bos ' + value);
    this.setState({
      diskon: value
    })
  }

  onClickItem(data){

    var temp = this.state.transaksi.concat(data);
    this.setState({ transaksi: temp });

  }

  onTestClickItem(data){


    //console.log(data);

    this.props.tambahData(data);
    let a = this.hitungTotal();
    //console.log(a);
  }


  hitungTotal(){
    let a = this.props.dataTransaksi.length;
    //console.log(a);

    totalNilai = 0;
    let i = 0;
    for(i=0;i<a;i++){
      totalNilai = totalNilai + parseInt(this.props.dataTransaksi[i].subtotal, 10);
    }

    let persen = this.state.diskon;
    let besardiskon = persen * totalNilai / 100;

    totalAkhir = totalNilai - besardiskon

    return totalAkhir;
  }

  plusButton = (index, data, b) => {

    this.props.plusOne(index, data);
  }

  minusButton = (index, data, b) => {
    this.props.minusOne(index,data);
  }

  clearAll = () => {
    this.setState({ diskon : 0 })
    this.props.resetData();
  }

  cetakBill = () => {
    alert("Tidak ada koneksi ke printers");
  }

  renderItem(item){

    //console.log(item.index);
    return(
      <TouchableOpacity style={{ padding: 10, marginBottom: 10, justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9EDEC" }} onPress={()=> {this.onTestClickItem(item.item);}}>
        <Text style={styles.text}>{item.item.name}</Text>
        <Icon type="AntDesign" name="right" style={{ color: 'grey', fontSize: 20 }}/>
      </TouchableOpacity>
    );
  }

  renderTransaksi(item){
    //console.log(item);
    return(
      <Row onPress={()=> this.changeModalVisibility(true, 5, item.index)}>
        <Col size={2} style={{ padding: 10, justifyContent: 'center' }}>
          <Text style={styles.text}>{item.item.name}</Text>
        </Col>
        <Col size={1} style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
          <Text style={styles.text}>Rp. {item.item.unit_price}</Text>
        </Col>
        <Col size={1} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
        <TouchableOpacity style={{ height: 23, width: 23, backgroundColor: color1, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 5}} onPress={ this.minusButton.bind(this,item.index, this.props.dataTransaksi) }>
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{item.item.quantity}</Text>
        <TouchableOpacity style={{ height: 23, width: 23, backgroundColor: color1, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 5 }} onPress={ this.plusButton.bind(this,item.index, this.props.dataTransaksi) }>
          <Text>+</Text>
        </TouchableOpacity>
        </Col>
        <Col size={1} style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
          <Text style={styles.text}>Rp. {item.item.subtotal}</Text>
        </Col>
        <Col size={1} style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 2 }}>
          <Text style={styles.text}>{item.item.spg}</Text>
        </Col>
      </Row>
    );
  }

  onCheckout = () => {
    //console.log('oke bos');
    let a = this.hitungTotal();

    //console.log(a);

    if(a <= 0){
      alert("Keranjang kosong");
    }else{
      this.changeModalVisibility(true, 1);
    }
  }
  changeModalVisibility=(bool, data, index)=>{
    //console.log('data adalah : ' + data)

    if(data == 1){
      this.setState({ testModal: <SimpleModal changeModalVisibility={this.changeModalVisibility} totalHarga={this.props.setTotal} navigation={this.props.navigation}/>})
    }else if(data == 2){
      this.setState({ testModal: <ModalListBill changeModalVisibility={this.changeModalVisibility}  tempBill={this.state.tempBill} />})
    }else if(data == 3){
      this.setState({ testModal: <ModalSimpanBill changeModalVisibility={this.changeModalVisibility} tempBill={this.state.tempBill} />})
    }else if(data == 4){
      this.setState({ testModal: <ModalCustomer changeModalVisibility={this.changeModalVisibility} navigation={this.props.navigation} />})
    }else if(data == 5){
      this.setState({ testModal: <ModalSPG changeModalVisibility={this.changeModalVisibility} navigation={this.props.navigation} indexSPG={index}/>})
    }else if(data == 6){
      this.setState({ testModal: <ModalDiskon changeModalVisibility={this.changeModalVisibility} onButtonPress={ this.onSetDiskon }/>})
    }

    this.setState({ isModalVisible: bool });
  }



  cekButton(){
    let hitung = this.hitungTotal();
    this.props.tambahTotal(hitung);
  }

  updateData = () => {
    let arr  = this.props.dataTransaksi;

    let dataFix = arr.map(el => {
      //console.log(el);
      el.id==='3'? {...el, name: 'hemeh'}: el
    })

    //console.log(dataFix);
  }

  simpanBill = () => {

    //console.log('simpanBill ok')
  }

  _getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Data');
      if (value !== null) {
        // We have data!!
        let data = JSON.parse(value);
        this.setState({
            tempBill: data
        })
      }else{
        this.setState({
          tempBill: []
        })
      }
    } catch (error) {
      // Error retrieving data
    }
  }


  onCariBarang = (text) => {
    this.props.cariBarang(text);
  }

  render(){

    this.cekButton();

    const { col1, col2 } = styles;
    return(
      <Container style={{backgroundColor: '#E9EDEC', paddingTop: 10}}>
        <Grid>
          <Col size={2} style={{margin: 10, paddingLeft: 10, paddingRight: 10}}>
            <Row style={{ height: 50, marginBottom: 8, backgroundColor: '#FFFFFF' }}>
              <View style={{ flex: 1 , justifyContent: "space-between", alignItems: 'center', flexDirection: 'row', paddingLeft: 16, paddingRight: 16}}>
                <Input placeholder="Cari Barang"
                onChangeText={( text )=> this.onCariBarang(text) }
                />
              </View>
            </Row>

            <Row style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', padding: 10, borderBottomWidth: 1, borderColor: 'grey'}}>
                <Text style={styles.text}>Library</Text>
            </Row>
            <Row style={{ backgroundColor: '#ffffff'}}>
              <Grid style={{ padding: 10, margin: 0}}>
                <FlatList
                  data={this.props.dataLibrary.dataList}
                  renderItem={(item)=>this.renderItem(item)}
                />
              </Grid>
            </Row>
          </Col>
          <Col size={3} style={{backgroundColor:'white', borderRadius: 10, margin: 10, marginRight: 20}}>
            <Row style={{height: 80}}>
                <Col size={1} style={{ backgroundColor: color3, borderTopLeftRadius: 10 }}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={()=> this.changeModalVisibility(true, 2)}>
                  <Icon type="Entypo" name="list" style={{ color: 'white', fontSize: 40}}/>
                  </TouchableOpacity>
                </Col>
                <Col size={3} style={{ backgroundColor: color2, borderTopRightRadius: 10 }}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={()=> this.changeModalVisibility(true, 4)}>
                    <Text style={{ fontSize: 25, color: '#ffffff' }}>+Customer</Text>
                  </TouchableOpacity>
                </Col>
            </Row>
            <Row style={{ height: 35, backgroundColor: color1}}>
              <Col size={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={ [styles.text , {color: 'white'}]}>Produk</Text>
              </Col>
              <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={ [styles.text , {color: 'white'}]}>Harga</Text>
              </Col>
              <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={ [styles.text , {color: 'white'}]}>QTY</Text>
              </Col>
              <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={ [styles.text , {color: 'white'}]}>Subtotal</Text>
              </Col>
              <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={ [styles.text , {color: 'white'}]}>SPG</Text>
              </Col>
            </Row>
            <Row>
              <FlatList
                data={this.props.dataTransaksi}
                renderItem={(item)=>this.renderTransaksi(item)}
              />
            </Row>

            <Row style={{ height: 40, borderTopWidth: 1}}>
              <Col style={{ backgroundColor: 'white', margin: 1, height: 40, justifyContent: 'center', paddingLeft: 10 }}>
                <Text style={[styles.text,{ fontSize: 20 }]}>Diskon : {this.state.diskon}%</Text>
              </Col>
            </Row>

              <Row style={{ height: 40,}}>
                <Col style={{ backgroundColor: color1, margin: 1 }}>
                  <TouchableOpacity style={{ flex: 1, justifyContent:'center', alignItems:'center'}} onPress={ ()=> this.changeModalVisibility(true, 3)}>
                    <Text style={[styles.text , {color: '#ffffff'}]}>Simpan Bill</Text>
                  </TouchableOpacity>
                </Col>
                <Col style={{ backgroundColor: color1, margin: 1 }}>
                <TouchableOpacity style={{ flex: 1, justifyContent:'center', alignItems:'center'}} onPress={ this.cetakBill.bind(this)}>
                  <Text style={[styles.text , {color: '#ffffff'}]}>Cetak Bill</Text>
                </TouchableOpacity>
                </Col>
              </Row>
              <Row style={{ height: 40,}}>
                <Col style={{ backgroundColor: color1, margin: 1 }}>
                  <TouchableOpacity style={{ flex: 1, justifyContent:'center', alignItems:'center'}} onPress={ ()=> this.changeModalVisibility(true, 6)}>
                    <Text style={[styles.text , {color: '#ffffff'}]}>Set Diskon</Text>
                  </TouchableOpacity>
                </Col>
                <Col style={{ backgroundColor: color1, margin: 1 }}>
                <TouchableOpacity style={{ flex: 1, justifyContent:'center', alignItems:'center'}} onPress={this.clearAll.bind(this)}>
                  <Text style={[styles.text , {color: '#ffffff'}]}>Hapus Daftar</Text>
                </TouchableOpacity>
                </Col>
              </Row>
              <Row style = {{ backgroundColor: color3, height: 60, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                <Col>
                  <TouchableOpacity style={{ flex: 1, justifyContent:'center', alignItems:'center'}} onPress={()=> {this.onCheckout()}}>
                    <Text style={{ fontSize: 30, color: '#ffffff' }}>Total Rp.{this.props.setTotal}</Text>
                  </TouchableOpacity>
                </Col>
              </Row>

          </Col>
        </Grid>

          <View style={{ height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Grid>
              <Row>
                <Col style={{ backgroundColor: color2, width: 80}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', paddingLeft: 20 }} onPress={()=> this.props.navigation.openDrawer()}>
                    <Icon type="Entypo" name="menu" style={{ color: 'white', fontSize: 40}} />
                  </TouchableOpacity>
                </Col>
                <Col style={{ backgroundColor: color2}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.props.navigation.navigate('Favorites')} }>
                    <Icon type="Ionicons" name="md-star" style={{ color: 'white', fontSize: 40}} />
                    <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Transaction</Text>
                  </TouchableOpacity>
                </Col>
                <Col style={{ backgroundColor: color3}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon type="Entypo" name="list" style={{ color: 'white', fontSize: 40}}/>
                    <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Library</Text>
                  </TouchableOpacity>
                </Col>
                <Col style={{ backgroundColor: color2}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.props.navigation.navigate('Inventory')} }>
                    <Icon type="Ionicons" name="md-calculator" style={{ color: 'white', fontSize: 40}}/>
                    <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Manual</Text>
                  </TouchableOpacity>
                </Col>
              </Row>
            </Grid>
          </View>


          <Modal animationType="slide" transparent={true} visible={this.state.isModalVisible} onRequestClose={()=> this.setState({ isModalVisible: false })}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {this.state.testModal}
              </View>
          </Modal>


      </Container>
    );
  }
}

export default connect(mapStateToProps, {cariBarang, tambahData, tambahLibrary, tambahTotal, resetData, removeTransaksiById, removeDataTransaksi, plusOne, minusOne})(Home);

function mapStateToProps(state){
  return {
    dataTransaksi: state.setDataTransaksi,
    dataLibrary: state.setDataList,
    setTotal: state.setTotal,
    dataCustomer: state.setDataCustomer,
  };
}

// function mapDispatchToProps(dispatch){
//   return{
//     setDataList: ()=> dispatch({ type: "SET_DATA_LIST" }),
//     setDataTransaksi: ()=> dispatch({ type: "SET_DATA_TRANSAKSI "}),
//   }
// }

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto",
    fontSize: 15,
    color: 'grey'
  },
  col1: {
    flex: 2,
    justifyContent: "center",
    alignItems:"center",
    padding: 10
  },
  col2: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    padding: 10
  }
});
