const initialState = [];
var count = 0;

const setDataTransaksi = (state=[], action) => {
  switch(action.type){

    case 'TAMBAH_DATA':
      //console.log(action.data);

      count = count + 1;

      return [
        ...state, {
          id: action.data.id,
          name: action.data.name,
          option: 'a',
          real_unit_price: action.data.price,
          unit_price: action.data.unit_price,
          quantity: 1,
          serial: action.data.code,
          discount: 0,
          subtotal: action.data.price,
          spg: 'SPG',
          index: count,
        }
      ]

    case 'RESET_DATA_TRANSAKSI':

      count = 0;
      state = initialState;

      return state;

    case 'REMOVE_TRANSAKSI_BY_ID':

      return action.data;

    case 'PLUS_ONE':

      let a = action.payload;

      console.log(a);

      return [...state = a];

    case 'MINUS_ONE':

      let b = action.payload;
      return [...state = b];

    case 'ADD_SPG':

      console.log('masuk spg');

      console.log(action.payload);

      let c = action.payload;

      return [...state = c ];

    default:

      return state;
  }
}

export default setDataTransaksi;
