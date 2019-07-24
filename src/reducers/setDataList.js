const setDataList = (state=[], action) => {
  switch(action.type){
    case "ADD_LIBRARY":

      console.log('hemeh');
      const data = action.data.data.data;

      return[...state, data];

    default:
      return state;
  }
}

export default setDataList;
