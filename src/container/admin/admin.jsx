import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Layout } from 'antd';
import Header from './header/header'
import {deleteUserInfo} from '../../redux/actions/login_action'
import checkLogin from '../check_login/check_login'
import './css/admin.less'
import {reqCategory} from '../../api'

const { Footer, Sider, Content } = Layout;


@connect(
    state => ({userInfo:state.userInfo}),
    {deleteUserInfo} 
)
@checkLogin
class Admin extends Component {

   goods = async()=>{
        console.log(1)
        let result = await reqCategory()
        console.log(1,result)
   }

    render() {
        return (
            <Layout className="admin">
                <Sider>
                    <button onClick={this.goods} style={{color:"black"}}>获取商品分类数据</button>
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