import request from './axios/request'
import Qs from 'qs'

export function signIn(data){
   return request({
       url:'/todo/signin',
       method:'post',
       data:Qs.stringify(data)
   })
}