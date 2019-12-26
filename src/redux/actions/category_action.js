import {GET_CATEGORY_LIST} from '../action_types'
import {reqCategoryList} from '../../api'
import { message } from 'antd'

export const getCategoryList = (value) => ({type:GET_CATEGORY_LIST,data:value})

export const getCategoryListAsync = ()=>{
    return async(dispatch) => {
        let result = await reqCategoryList()
        const {status,data,msg} = result
        if(status === 0){
            dispatch(getCategoryList(data))
        }else{
            message.error(msg)
        }
    }
}
