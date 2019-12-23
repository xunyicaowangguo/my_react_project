// 统一管理项目中的ajax请求
import myAxios from './myAxios'
import jsonp from 'jsonp'
import {WEATHER_AK,WEATHER_BASE_URL,WEATHER_CITY} from '../config'
import { message } from 'antd'

// 登录请求
export const reqLogin = (loginObj) => myAxios.post('/login',loginObj)
// 请求天气信息(使用jsonp的方式)
export const reqWeatherData = ()=>{
    return new Promise((resolve,reject)=>{
        jsonp(`${WEATHER_BASE_URL}?location=${WEATHER_CITY}&output=json&ak=${WEATHER_AK}`,(err,data)=>{
            if(!err){
                resolve(data.results[0].weather_data[0])
            }else{
                message.error('请求天气信息的数据失败，请联系管理员')
            }
        })
    })
}