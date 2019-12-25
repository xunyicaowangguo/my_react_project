import {combineReducers} from 'redux'
import LoginReducer from './login_reducer'
import leftNavReducer from './leftNav_reducer'

export default combineReducers({
	userInfo:LoginReducer,
	menuTitle:leftNavReducer
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