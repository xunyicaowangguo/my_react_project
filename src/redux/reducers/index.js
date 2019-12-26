import {combineReducers} from 'redux'
import LoginReducer from './login_reducer'
import LeftNavReducer from './leftNav_reducer'
import CategoryList from './category_reducer'

export default combineReducers({
	userInfo:LoginReducer,
	menuTitle:LeftNavReducer,
	categoryList:CategoryList
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