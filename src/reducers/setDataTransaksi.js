const initialState = [];
var count = 0;

const setDataTransaksi = (state=[], action) => {
  switch(action.type){

    case 'TAMBAH_DATA':
      //console.log(state);

      count = count + 1;

      return [
        ...state, {
          id: action.data.id,
          name: action.data.name,
          price: action.data.price,
          index: count,
        }
      ]

    case 'RESET_DATA_TRANSAKSI':

      count = 0;
      state = initialState;

      return state;

    case 'REMOVE_TRANSAKSI_BY_ID':

      return action.data;

    default:
      return state;
  }
}

export default setDataTransaksi;
