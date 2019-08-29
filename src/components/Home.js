import React, { Component} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, AsyncStorage } from 'react-native';
import { Container, Header,Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { Row, Col, Grid} from 'react-native-easy-grid';
import { connect } from 'react-redux';
import axios from 'axios';
import { tambahData, tambahLibrary, tambahTotal, resetData, removeTransaksiById, removeDataTransaksi } from '../actions';
import SimpleModal from './SimpleModal';
import ModalSPG from './ModalSPG';
import ModalSimpanBill from './ModalSimpanBill';
import ModalListBill from './ModalListBill';
import ModalCustomer from './ModalCustomer';

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
      tempBill: []
    }
  }

  componentDidMount(){

    //console.log('sini');

    axios.get("http://mpos.bursasajadah.com/api/v1/products?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s")
      .then(
        (res)=>{

          //console.log('hemeh');
          //console.log(res.data.data);
          //this.setState({ data: res.data.data });
           //console.log(res);
          this.props.dispatch(tambahLibrary(res));


        }
      )
      .catch((error) => {
          console.log(error);
      });
  }

  onClickItem(data){

    var temp = this.state.transaksi.concat(data);
    this.setState({ transaksi: temp });

  }

  onTestClickItem(data){

    this.props.dispatch(tambahData(data));
    let a = this.hitungTotal();
    console.log(a);
  }


  hitungTotal(){
    let a = this.props.dataTransaksi.length;
    //console.log(a);

    totalNilai = 0;
    let i = 0;
    for(i=0;i<a;i++){
      totalNilai = totalNilai + parseInt(this.props.dataTransaksi[i].price, 10);
    }

    return totalNilai;
  }

  cekButtonz(index){
    //console.log(index);

    let a = { "hemeh1": this.props.dataTransaksi, "hemeh2": 0 }
    this.props.dispatch(removeDataTransaksi(this.props.dataTransaksi ));
  }

  clearAll = () => {
    this.props.dispatch(resetData());
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
      <Row onPress={ ()=> { this.cekButtonz(); }}>
        <Col size={2} style={{ padding: 10, justifyContent: 'center' }}>
          <Text style={styles.text}>{item.item.name}</Text>
        </Col>
        <Col size={1} style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
          <Text style={styles.text}>Rp. {item.item.price}</Text>
        </Col>
        <Col size={1} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
        <View style={{ height: 23, width: 23, backgroundColor: color1, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 5}}>
          <Text>+</Text>
        </View>
        <Text style={styles.text}>1</Text>
        <View style={{ height: 23, width: 23, backgroundColor: color1, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 5 }}>
          <Text>+</Text>
        </View>
        </Col>
        <Col size={1} style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
          <Text style={styles.text}>Rp. {item.item.price}</Text>
        </Col>
        <Col size={1} style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 2 }}>
          <Text style={styles.text}>SPG 1</Text>
        </Col>
      </Row>
    );
  }

  changeModalVisibility=(bool, data)=>{
    //console.log('data adalah : ' + data)

    if(data == 1){
      this.setState({ testModal: <SimpleModal changeModalVisibility={this.changeModalVisibility} totalHarga={this.props.setTotal} />})
    }else if(data == 2){
      this.setState({ testModal: <ModalListBill changeModalVisibility={this.changeModalVisibility}  tempBill={this.state.tempBill} />})
    }else if(data == 3){
      this.setState({ testModal: <ModalSimpanBill changeModalVisibility={this.changeModalVisibility} tempBill={this.state.tempBill} />})
    }else if(data == 4){
      this.setState({ testModal: <ModalCustomer changeModalVisibility={this.changeModalVisibility} />})
    }

    this.setState({ isModalVisible: bool });
  }



  cekButton(){
    let hitung = this.hitungTotal();
    this.props.dispatch(tambahTotal(hitung));
  }

  updateData = () => {
    let arr  = this.props.dataTransaksi;

    let dataFix = arr.map(el => {
      console.log(el);
      el.id==='3'? {...el, name: 'hemeh'}: el
    })

    //console.log(dataFix);
  }

  simpanBill = () => {

    console.log('simpanBill ok')
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


  render(){

    this.cekButton();

    this._getData();

    const { col1, col2 } = styles;
    return(
      <Container style={{backgroundColor: '#E9EDEC', paddingTop: 10}}>
        <Grid>
          <Col size={2} style={{margin: 10, paddingLeft: 10, paddingRight: 10}}>
            <Row style={{ height: 50, marginBottom: 8, backgroundColor: '#FFFFFF' }}>
              <View style={{ flex: 1 , justifyContent: "space-between", alignItems: 'center', flexDirection: 'row', paddingLeft: 16, paddingRight: 16}}>
                <Text style={ styles.text }>Search</Text>
                <Icon name="search" />
              </View>
            </Row>

            <Row style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', padding: 10, borderBottomWidth: 1, borderColor: 'grey'}}>
                <Text style={styles.text}>Library</Text>
            </Row>
            <Row style={{ backgroundColor: '#ffffff'}}>
              <Grid style={{ padding: 10, margin: 0}}>
                <FlatList
                  data={this.props.dataLibrary[0]}
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

              <Row style={{ height: 60,}}>
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
                <Col style={{ backgroundColor: color1, margin: 1 }}>
                <TouchableOpacity style={{ flex: 1, justifyContent:'center', alignItems:'center'}} onPress={this.clearAll.bind(this)}>
                  <Text style={[styles.text , {color: '#ffffff'}]}>Hapus Daftar</Text>
                </TouchableOpacity>
                </Col>
              </Row>
              <Row style = {{ backgroundColor: color3, height: 60, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                <Col>
                  <TouchableOpacity style={{ flex: 1, justifyContent:'center', alignItems:'center'}} onPress={()=> this.changeModalVisibility(true, 1)}>
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
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.props.navigation.navigate('Manual')} }>
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

export default connect(mapStateToProps)(Home);

function mapStateToProps(state){
  return {
    dataTransaksi: state.setDataTransaksi,
    dataLibrary: state.setDataList,
    setTotal: state.setTotal,
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
