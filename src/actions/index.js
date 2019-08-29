import { TAMBAH_DATA, ADD_LIBRARY, TAMBAH_TOTAL, GET_DATA_SALES, RESET_DATA_TRANSAKSI, REMOVE_TRANSAKSI_BY_ID, GET_DATA_DETAIL } from './actionTypes';

export const tambahData = (data) => ({
  type: TAMBAH_DATA,
  data
})

export const removeTransaksiById = (data) => ({
  type: REMOVE_TRANSAKSI_BY_ID,
  data
})

export const resetData = () => ({
  type: RESET_DATA_TRANSAKSI,
})

export const tambahLibrary = (data) => ({
  type: ADD_LIBRARY,
  data
})

export const tambahTotal = (data) => ({
  type: TAMBAH_TOTAL,
  data
})

export const getDataSales = (data) => ({
  type: GET_DATA_SALES,
  payload: data
})

export const testThunk = () => {
  return async dispatch => {

    try{
      //let response = await fetch('http://mpos.bursasajadah.com/api/v1/sales?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s');
      //let response = await fetch('http://10.250.1.68/test/index.php/api/transaksi/transaksi');

      let response = await fetch('http://mpos.bursasajadah.com/api/v1/sales/?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s')
      let json = await response.json();


      //console.log(json);

      dispatch(getDataSales(json));

    }catch(error){
      console.log(error);
    }
  }
}


export const getDataDetail = (data) => ({
  type: GET_DATA_DETAIL,
  payload: data
})

export const getDetails = (id) => {
  return async dispatch => {
    try{

      //console.log(id);

      let response = await fetch(`http://mpos.bursasajadah.com/api/v1/sales?reference=${id}&api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s&include=items`);
      let json = await response.json();

      console.log(json);

      dispatch(getDataDetail(json));

    }catch(error){

    }
  }
}

export const removeDataTransaksi = (data) => {
  return async dispatch => {
    try{

      var array = await data.hemeh1; // make a separate copy of the array
      var index = await array[data.hemeh2];


      if (index !== -1) {

        array.splice(index, 1);

        dispatch(removeTransaksiById(array));
        //console.log(array)
        //state = array;
      }
    }catch(error){

    }
  }
}
