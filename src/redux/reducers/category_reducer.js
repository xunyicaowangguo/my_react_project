import {GET_CATEGORY_LIST} from '../action_types'

const initState = []
export default function(perState=initState,action){
    const {type,data} = action
    let newState
    switch (type) {
        case GET_CATEGORY_LIST:
            newState = [...data.reverse()]
            return newState

        default:
            return perState
    }
}