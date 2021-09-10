import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "../types";
  import { Dispatch } from 'redux';//, bindActionCreators
  //import { createAction } from 'redux-actions';
  

  import AuthService from "../../services/auth.service";
  
  export const registerAction = (customerData:any) => (dispatch:Dispatch) => {
    console.log('customerData',customerData)
    return AuthService.register(customerData).then(
      (response:any) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error:any) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const login = (username:any, password:any,companyCode:any) => (dispatch:Dispatch) => {
    console.log('usernameusername',username)
    return AuthService.login(username, password,companyCode).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data.response },
        });
        dispatch({
          type: SET_MESSAGE,
          payload:{ message:data.message,variant:'success'},
        });
        return Promise.resolve();
      },
      (error) => {
       
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: {message,variant:'danger'},
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const logout = () => (dispatch:Dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };