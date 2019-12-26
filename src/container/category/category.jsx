import React, { Component } from 'react'
import { Card,Button,Icon,Table,Modal,Form,Input,message,Popconfirm } from 'antd'
import {connect} from 'react-redux'
import {reqAddCategory,reqUpdateCategory} from '../../api'
import {getCategoryListAsync} from '../../redux/actions/category_action'
import {PAGE_SIZE} from '../../config'
const {Item} = Form
@connect(
    state => ({categoryList:state.categoryList}),
    {getCategoryListAsync,}
)
@Form.create()
class Category extends Component {
    state = { 
      visible:false
    }
    handleOk = () => {
      this.props.form.validateFields(async(err,values)=>{
        if(!err){
          let result
          if(this.isAdd){
            result = await reqAddCategory(values)
          }else{
            result = await reqUpdateCategory(this.id,values.categoryName)
            console.log(this.id,values);
          }
          const {status,msg} = result
          if(status === 0){
            message.success('操作分类成功',1)
            this.props.getCategoryListAsync()
            this.setState({visible:false})
            this.props.form.resetFields()
          }else{
            message.warning(msg,1)
          }
        }
        
      })
      this.setState({visible: false})
    }

    handleCancel = () => {
      this.props.form.resetFields()
      this.setState({visible: false})
    }

    componentDidMount(){
        this.props.getCategoryListAsync()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        // const dataSource = this.props.categoryList
          const columns = [
            {
              title: '分类名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              key: '_id',
              align:'center',
              width: '25%',
              render:(text, record, index)=>{
                return (
                  <div>
                    <Button type="link" 
                      onClick={
                        ()=>{
                          this.name = record.name
                          this.id = record._id
                          this.isAdd = false
                          console.log(this)
                          this.setState({visible:true})
                        }
                      }
                    >更新分类</Button>
                  </div>
                )
              }
            }
          ]

        return (
          <div>
            <Card extra={<Button type="primary" 
                            onClick={()=>{
                              this.name = ''
                              this.id = ''
                              this.isAdd = true
                              this.setState({visible:true})
                            }}
                          >
                            <Icon type="plus-circle" />添加
                          </Button>}>
              <Table 
                dataSource={this.props.categoryList} 
                columns={columns} 
                bordered
                rowKey='_id'
                pagination={{pageSize:PAGE_SIZE}}
              />
            </Card>
            <Modal
              title={this.isAdd?"新增分类":"更新分类"}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText="确认"
              cancelText="取消"
            >
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Item>
                  {getFieldDecorator('categoryName', {
                    initialValue:this.name || '',
                    rules: [{ required: true, message: '分类名称必须填!' }]
                  })(
                    <Input placeholder="请输入分类名称"/>
                  )}
                </Item>
              </Form>
            </Modal>
          </div>
        )
    }
}

export default Category