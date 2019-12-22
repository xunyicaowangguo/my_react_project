import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {saveUserInfo} from '../../redux/actions/login_action'
import {Form, Icon, Input, Button,message} from 'antd'
import {reqLogin} from '../../api'
import logo from './img/logo.png'
import './css/login.less'
const {Item} = Form


class Login extends Component {
    
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.form.validateFields(async(err, values) => {
            
            if (!err) {
                // console.log('发送请求: ', values)
                let loginResult = await reqLogin(values)
                console.log(loginResult)
                const {status,data,msg} = loginResult
                if(status === 0){
                    console.log(data)
                    message.success('登录成功',1)
                    console.log(this.props.history)
                    this.props.history.push('/admin')
                    this.props.saveUserInfo(data)
                }else{
                    message.warning(msg,1)
                }
                
            }
        })
    }

    passwordValidator=(rule, value, callback)=>{
        if(!value){
            callback('密码必须输入!')
        }else if(value.length < 4){
            callback('密码必须大于等于4位!')
        }else if(value.length > 12){
            callback('密码必须小于等于12位!')
        }else if(!(/^\w+$/).test(value)){
            callback('密码必须是英文、数组或下划线组成!')
        }
        callback()
    }

    render() {
        if(this.props.userInfo.isLogin){
            return <Redirect to="/admin"/>
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="login">
                <div className="header">
                    <img src={logo} alt="logo"/>
                    <h1>商品管理系统</h1>
                </div>
                <div className="content">
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, message: '用户名必须输入!' },
                                    { min: 4, message: '用户名必须大于等于4位!' },
                                    { max: 12, message: '用户名必须小于等于12位!' },
                                    { pattern: /^\w+$/, message: '用户名必须是英文、数组或下划线组成!' }
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    { validator: this.passwordValidator }
                                ]
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                                />
                            )}
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        </Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({userInfo:state.userInfo}),
    {saveUserInfo}
)(Form.create()(Login))
