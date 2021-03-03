import React from 'react'
import * as actionTypes from '../constants/aluminiConstants'
export const aluminiListReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ALUMINI_LIST_REQUEST:
      return { loading: true }
    case actionTypes.ALUMINI_LIST_SUCCESS:
      return { loading: false, success: true, aluminies: action.payload }
    case actionTypes.ALUMINI_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const aluminiDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ALUMINI_DETAIL_REQUEST:
      return { loading: true }
    case actionTypes.ALUMINI_DETAIL_SUCCESS:
      return { loading: false, success: true, alumini: action.payload }
    case actionTypes.ALUMINI_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
