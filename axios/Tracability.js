import axios from 'axios'
import {ROOT_URL} from './index'

// ===== MAIN PAGE BANNER ===== 

// https://tulipthewine.com/api/v1/wine/list/
export function getList(req){
    return axios({ method: 'GET', url: ROOT_URL + `/wine/list/${req.query}`, data : null ,  headers: null })
}

export function getItem(req){
    return axios({ method: 'GET', url: ROOT_URL + `/wine/item/${req.query}`, data : null ,  headers: null })
}

// all
export function getListAll(req){
    return axios({ method: 'GET', url: ROOT_URL + `/wine/list-all/${req.query}`, data : null ,  headers: null })
}

export function getItemAll(req){
    return axios({ method: 'GET', url: ROOT_URL + `/wine/item-all/${req.query}`, data : null ,  headers: null })
}
