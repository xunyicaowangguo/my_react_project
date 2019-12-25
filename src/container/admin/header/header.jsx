import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button,Icon,Modal } from 'antd'
import {withRouter} from 'react-router-dom'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import {deleteUserInfo} from '../../../redux/actions/login_action'
import { reqWeatherData } from '../../../api'
import menuList from '../../../config/menu-config'
import {saveMenuTitle} from '../../../redux/actions/leftNav_action'
import './header.less'


const {confirm} = Modal


@connect(
    state => ({userInfo:state.userInfo,title:state.menuTitle}),
    {deleteUserInfo,saveMenuTitle}
)
@withRouter
class Header extends Component {

    state={
        isFull:false,
        date:dayjs().format('YYYY年 MM月-DD日 HH:mm:ss'),
        weatherData:{}
    }

    //全屏切换
    switchFullScreen = ()=>{
        screenfull.toggle()
    }

    //退出登录
    logout=()=>{
        confirm({
            title: '确定退出吗？',
			content: '若退出需要重新登录',
			cancelText:'取消',
			okText:'确定',
			onOk:()=> {
				this.props.deleteUserInfo()
			},
        })
    }

    //获取天气信息
    getWeatherData = async () => {
        let result = await reqWeatherData()
        this.setState({
            weatherData:{
                img:result.dayPictureUrl,
                weather:result.weather,
                temperature:result.temperature
            }
        })
    }

    componentDidMount(){
        // console.log('componentDidMount');
        screenfull.on('change',()=>{
            let {isFull} = this.state
            this.setState({isFull:!isFull})
            console.log(isFull);
        })
        this.time = setInterval(()=>{
            this.setState({date:dayjs().format('YYYY年 MM月-DD日 HH:mm:ss')})
        },1000)
        this.getWeatherData()
    }

    componentWillUnmount(){
        clearInterval(this.time)
    }

    getTitle = (menuKey)=>{
		console.log('----redux中没有title，只能靠getTitle计算---------');
		let title = ''
		menuList.forEach((menuObj)=>{
			if(menuObj.children instanceof Array){
				let result = menuObj.children.find((menuChildrenObj)=>{
					return menuChildrenObj.key === menuKey
				})
				if(result) title = result.title
			}else{
				if(menuObj.key === menuKey) title = menuObj.title
			}
		})
		this.props.saveMenuTitle(title)
		return title
	}


    render() {
        const {username} = this.props.userInfo.user
        const {img,weather,temperature} = this.state.weatherData
        const menuKey = this.props.history.location.pathname.split('/').reverse()[0]
        return (
            <div className="header">
                <div className="header-top">
                    <Button size="small" onClick={this.switchFullScreen}>
                        <Icon type={this.state.isFull?'fullscreen-exit':'fullscreen'}/>
                    </Button>
                    <span>欢迎，{username}!</span>
                    <Button size="small" type="link" onClick={this.logout}>退出登录</Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        <span>{this.props.title || this.getTitle(menuKey)}</span>
                    </div>
                    <div className="header-bottom-right">
                        <span>{this.state.date}</span>
                        <img src={img} alt="天气图片"/>
                        <span>{weather}  温度：{temperature}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
