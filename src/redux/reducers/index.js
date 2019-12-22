import {combineReducers} from 'redux'
import LoginReducer from './login_reducer'

export default combineReducers({
    userInfo:LoginReducer
})

/* 
	redux中保存的总状态如下：
		{
			userInfo：{
				user:{username:xxxxx,a:xxxxx,b:xxxxx}
				token:xxxxxx
				isLogin:xxxxx
			}
		}
*/