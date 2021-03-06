import axios from 'axios'
import * as actionTypes from '../constants/materialConstants'

export const listMaterials = (sem, branch) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.MATERIAL_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/material?sem=${sem}&branch=${branch}`
    )
    // const data1 = data.map((x) => x.sem == sem && x.branch == branch)

    dispatch({
      type: actionTypes.MATERIAL_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.MATERIAL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createMaterial = (material) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.MATERIAL_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/material`, material, config)

    dispatch({
      type: actionTypes.MATERIAL_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.MATERIAL_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getMaterialDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.MATERIAL_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/material/${id}`)

    dispatch({
      type: actionTypes.MATERIAL_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.MATERIAL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateMaterial = (material) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.MATERIAL_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/material/${material._id}`,
      material,
      config
    )

    dispatch({
      type: actionTypes.MATERIAL_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.MATERIAL_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const deleteMaterialAction=(id)=>async(dispatch,getState)=>{
  try {
    
    dispatch({type:actionTypes.MATERIAL_DELETE_REQUEST});
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/material/${id}`,config);
    dispatch({type:actionTypes.MATERIAL_DELETE_SUCCESS});

  } catch (error) {
    dispatch({
      type:actionTypes.MATERIAL_DELETE_FAIL,
      payload:error
    })
  }
}