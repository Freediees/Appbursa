const setDataTransaksi = (state=[], action) => {
  switch(action.type){
    case 'TAMBAH_DATA':
      //console.log(state);


      return [
        ...state, {
          id: action.data.id,
          name: action.data.name,
          price: action.data.price
        }
      ]
    default:
      return state;
  }
}

export default setDataTransaksi;
