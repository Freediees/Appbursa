import { TAMBAH_DATA, ADD_LIBRARY, TAMBAH_TOTAL } from './actionTypes';

export const tambahData = (data) => ({
  type: TAMBAH_DATA,
  data
})

export const tambahLibrary = (data) => ({
  type: ADD_LIBRARY,
  data
})

export const tambahTotal = (data) => ({
  type: TAMBAH_TOTAL,
  data
})
