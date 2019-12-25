import {SAVEMENUTITLE} from '../action_types'


let initState = ''
export default function (perState=initState,action){
    const {type,data} = action
    let newState
    switch (type) {
        case SAVEMENUTITLE:
            newState = data
            return newState

        default:
            return perState
    }

} 