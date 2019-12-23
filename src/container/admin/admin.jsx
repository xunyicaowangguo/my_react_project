import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deleteUserInfo} from '../../redux/actions/login_action'
import {Redirect} from 'react-router-dom'



@connect(
    state => ({userInfo:state.userInfo}),
    {deleteUserInfo} 
)
class Admin extends Component {

    logout=()=>{
        this.props.deleteUserInfo()
    }

    render() {
        if(!this.props.userInfo.isLogin){
            return <Redirect to="/login"/>
        }
        return (
            <div>
                <span>Hello,{this.props.userInfo.user.username}!</span>
                <button onClick={this.logout}>退出登录</button>
            </div>
        )
    }
}

export default Admin

// export default connect(
//     state => ({userInfo:state.userInfo}),
//     {deleteUserInfo}
// )(Admin)