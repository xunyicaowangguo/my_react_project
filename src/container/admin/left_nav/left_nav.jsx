import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {saveMenuTitle} from '../../../redux/actions/leftNav_action'
import menuList from '../../../config/menu-config'
import logo from '../../../static/img/logo.png'
import './left_nav.less'
const { SubMenu,Item } = Menu;

@connect(
    state => ({}),
    {saveMenuTitle}
)
@withRouter
class LeftNav extends Component {

    state = {
        collapsed: false,
    }

    createMenu = (list) => {
        return list.map((menuObj)=>{
            if(!menuObj.children){
                return (
                    <Item key={menuObj.key} onClick={()=>{this.props.saveMenuTitle(menuObj.title)}}>
                        <Link to={menuObj.path}>
                            <Icon type={menuObj.icon}/>
                            <span>{menuObj.title}</span>
                        </Link>
                    </Item>
                )
            }else{
                return (
                    <SubMenu
                        key={menuObj.key}
                        title={
                            <span>
                                <Icon type={menuObj.icon}/>
                                <span>{menuObj.title}</span>
                            </span>
                        }
                    >
                        {this.createMenu(menuObj.children)}
                    </SubMenu>
                )
            }
        })
    }

    render() {
        const {pathname} = this.props.history.location
        // console.log(pathname.split('/').reverse()[0])
        // console.log(pathname.split('/')[2])
        // console.log(pathname.split('/').splice(2));
        return (
            <div>
                <div className="left-nav-top">
                    <img src={logo} alt="logo"/>
                    <span>商品管理系统</span>
                </div>
                <Menu
                    selectedKeys={[pathname.split('/').reverse()[0]]}
                    defaultOpenKeys={[pathname.split('/')[2]]}
                    mode="inline"
                    theme="dark"
                >
                    {this.createMenu(menuList)}
                </Menu>
            </div>
        )
    }
}

export default LeftNav