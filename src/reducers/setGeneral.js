const initialState = {
  diskon: 0,
  kas:0,
  totalDiskon: 0,
  dataUser:
      {
        company: "Stock Manager",
        created_on: "1351661704",
        email: "owner@tecdiary.com",
        first_name: "Owner",
        last_login: "1569998916",
        last_name: "Owner",
        phone: "012345678",
        username: "owner",
        warehouse: null,
        warehouse_id: null,
      },
  }

const setGeneral = (state=initialState, action) => {
  switch(action.type){
    case "SET_GENERAL":

      return {...state, diskon: action.payload};

    case "SET_KAS":

      return {...state, kas: action.payload};

    case "SET_TOTAL_DISKON":

      return {...state, totalDiskon: action.payload};

    case "SET_DATA_USER":


      return {...state, dataUser: action.payload};

    default:
      return state;
  }
}

export default setGeneral;
