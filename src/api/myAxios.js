import axios from 'axios'
import qs from 'querystring'
import NProgress from 'nprogress'
import {message} from 'antd'
import store from '../redux/store'
import {BASE_URL} from '../config'
import 'nprogress/nprogress.css'


axios.defaults.baseURL = BASE_URL

// 请求拦截器
axios.interceptors.request.use((config)=>{
    // console.log(config)
    NProgress.start()

    let {token} = store.getState().userInfo
    if(token) config.headers.Authorization = 'atguigu_' + token

    let {method,data} = config
    if(method.toUpperCase() === 'POST' && data instanceof Object){
        config.data = qs.stringify(data)
    }
    return config
})

// 响应拦截器
axios.interceptors.response.use(
    (response)=>{
        NProgress.done()
        return response.data
    },
    (error)=>{
        NProgress.done()
        message.error('网络连接失败！')
        return new Promise(()=>{})
    }
)

export default axios