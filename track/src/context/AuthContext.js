import createDataContext from "./createDataContext";
import tracker from "../api/tracker";

const authReducer=(state,action)=>{
    switch (action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload }
        default:
            return state;
    }
};

const signup=(dispatch)=>{
    return async({email, password})=>{
        //make api request to sign up with that email and password
        try{
            //const response= await tracker.post('/signup', {email, password});
            //if we sign up, modify our state, and say that we are authenticated
            console.log(email);
        }catch(err){
            //if signing up fails, we probably need to reflect an error message
            console.log('loi')
            //gọi dispatch khi nào muốn thay đổi state
            dispatch({type:'add_error', payload: 'Something went wrong with sign up'})
        }

    }
}

const signin=(dispatch)=>{
    return ({email, password})=>{
        //try to signin
        //Handle success by updating state
        //Handle failure by showing error message (somehow)
    }
}

const signout=(dispatch)=>{
    return ()=>{
        // somehow sign out
    }
}

export const {Provider,Context}=createDataContext(
    authReducer,
    {signin, signout,signup},
    {isSignedIn: false, errorMessage:''});