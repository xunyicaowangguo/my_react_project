import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Layout } from 'antd';
import {Redirect,Switch,Route} from 'react-router-dom'
import Header from './header/header'
import {deleteUserInfo} from '../../redux/actions/login_action'
import checkLogin from '../check_login/check_login'
import Home from '../../components/home/home'
import LeftNav from './left_nav/left_nav'
import Categroy from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
import './css/admin.less'
const { Footer, Sider, Content } = Layout;


@connect(
    state => ({userInfo:state.userInfo}),
    {deleteUserInfo} 
)
@checkLogin
class Admin extends Component {

   

    render() {
        return (
            <Layout className="admin">
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content className="content">
                        <Switch>
                            <Route path="/admin/home" component={Home}/>
                            <Route path="/admin/prod_about/category" component={Categroy}/>
                            <Route path="/admin/prod_about/product" component={Product}/>
                            <Route path="/admin/user" component={User}/>
                            <Route path="/admin/Role" component={Role}/>
                            <Route path="/admin/charts/bar" component={Bar}/>
                            <Route path="/admin/charts/line" component={Line}/>
                            <Route path="/admin/charts/pie" component={Pie}/>
                            <Redirect to="admin/home"/>
                        </Switch>
                    </Content>
                    <Footer className="footer">推荐使用谷歌浏览器，获取最佳用户体验</Footer>
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