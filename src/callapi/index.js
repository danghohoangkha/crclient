import axios from 'axios';
import * as url from '../constants/api';

const api = axios.create({
    baseURL: url.URL_API,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
})

export default api;