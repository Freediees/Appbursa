import {combineReducers} from 'redux';

import setDataTransaksi from './setDataTransaksi';
import setDataList from './setDataList';
import setTotal from './setTotal';

export default combineReducers({
  setDataTransaksi,
  setDataList,
  setTotal,
})
