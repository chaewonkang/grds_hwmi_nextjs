import axios from 'axios'
import {ROOT_URL} from './index'

export function getList(req){
    return axios({ method: 'GET', url: ROOT_URL + `/app/category/${req.query}`, data : null ,  headers: null })
}