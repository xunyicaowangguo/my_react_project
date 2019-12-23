import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Layout } from 'antd';
import Header from './header/header'
import {deleteUserInfo} from '../../redux/actions/login_action'
import checkLogin from '../check_login/check_login'
import './css/admin.less'
const { Footer, Sider, Content } = Layout;





@connect(
    state => ({userInfo:state.userInfo}),
    {deleteUserInfo} 
)
@checkLogin
class Admin extends Component {

    // logout=()=>{
    //     this.props.deleteUserInfo()
    // }

    render() {
        // if(!this.props.userInfo.isLogin){
        //     return <Redirect to="/login"/>
        // }
        return (
            // <div>
            //     <span>Hello,{this.props.userInfo.user.username}!</span>
            //     <button onClick={this.logout}>退出登录</button>
            // </div>
            <Layout className="admin">
                <Sider>
                    <button onClick={this.goods}>获取商品分类数据</button>
                </Sider>
                <Layout>
                    <Header/>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Admin

// export default connect(
//     state => ({userInfo:state.userInfo}),
//     {deleteUserInfo}
// )(Admin)