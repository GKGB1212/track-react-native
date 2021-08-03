import axios from 'axios';

export default axios.create({
    baseURL:'http://efe0a63f78ec.ngrok.io',
    headers:{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded application/json',
            'Accept': 'application/json'}
}})