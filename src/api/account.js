import request from './axios/request'
import Qs from 'qs'


export function getMailCode(params){
    return request({
        url:'/todo/getMailCode',
        methods:'get',
        params
    })
}



export function signIn(data){
   return request({
       url:'/todo/signin',
       method:'post',
       data:Qs.stringify(data)
   })
}

