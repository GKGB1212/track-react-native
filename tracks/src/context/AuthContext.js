//Sử dụng asyncStorage để lưu trữ dữ liệu ở local
import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import tracker from "../api/tracker";

import * as RootNavigation from "../navigationRef";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { token: action.payload, errorMessage: '' };
        case 'signout':
            return { token:null, errorMessage: '' };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token });
        RootNavigation.navigate('Main');
    }else{
        RootNavigation.navigate('stack');
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({
        type: 'clear_error_message'
    })
}

const signup = (dispatch) => async ({ email, password }) => {
    try {
        const response = await tracker.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token })

        // navigate('Main');
        RootNavigation.navigate('Main');
    } catch (err) {
        console.log(err)
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' })
    }
};

const signin = (dispatch) => {
    return async ({ email, password }) => {
        //try to signin
        //Handle success by updating state
        //Handle failure by showing error message (somehow)
        try {
            const response = await tracker.post('/signin', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin', payload: response.data.token })
            RootNavigation.navigate('Main');

        } catch (err) {
            dispatch({
                type: 'add_error',
                payload: 'Something went wrong with sign in'
            })
        }
    }
}

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'signout' })
        RootNavigation.navigate('stack');

    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' });