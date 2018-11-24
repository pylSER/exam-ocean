import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styles from './RegisterStudentPage.css'
import { Icon, Form, Input,Button,notification } from 'antd'
import Header from '../components/MainLayout/headerReg'
const FormItem = Form.Item

const RegStudent = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldValue,
    validateFields
  },
  isRegisterSuccess,
  isRegisterDuplicate,
  isConnectionBad
}) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  }

  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      } else {
        dispatch({ type: 'studentRegister/registerStudent', payload: values });
      }
    })
  }

  function checkConfirm(rule, value, callback){
    if (value) {
      validateFields(['confirm'], { force: true });
    }
    callback();
  }

  function checkPassword (rule, value, callback){
    if (value && value !== getFieldValue('password')) {
      callback('密码不一致!');
    } else {
      callback();
    }
  }

  function clearNotificationState(){
    dispatch({
      type: 'studentRegister/save',
      payload: {
          isRegisterSuccess: false,
          isRegisterDuplicate: false,
          isConnectionBad: false
      }
  })
  }



if(isRegisterSuccess){
  clearNotificationState();
  notification["success"]({
    message: '注册成功!',
    description: '3秒后返回登录页面',
    duration: 3,
    onClose:function(){
      window.location="/";
    }
  });
}

if(isRegisterDuplicate){
  clearNotificationState();
  notification["error"]({
    message: '用户名已存在',
    description: '',
    duration: 3,
  });
}

if(isConnectionBad){
  clearNotificationState();
  notification["error"]({
    message: '网络连接失败',
    description: '检查网络并重试',
    duration: 3,
  });
}


  return (
    <div>
      <Header />
      <div className={styles.role}>
          学生注册
        </div>

      <div className={styles.typeRow}>
        <Form onSubmit={handleOk} className={styles.regForm}>
          <FormItem
            {...formItemLayout}
            label='姓名'
            hasFeedback
                >
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: '请输入姓名'
              }]
            })(
              <Input />
                  )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label='学号'
            hasFeedback
                >
            {getFieldDecorator('studentID', {
              rules: [{
                required: true, message: '请输入学号'
              }]
            })(
              <Input />
                  )}
          </FormItem>

          <FormItem
          {...formItemLayout}
          label="E-mail"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '电子邮箱格式不正确',
            }, {
              required: true, message: '请输入电子邮箱',
            }],
          })(
            <Input />
          )}
        </FormItem>

          <FormItem
            {...formItemLayout}
            label='密码'
            hasFeedback
      >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码'
              }, {
                validator: checkConfirm
              }]
            })(
              <Input type='password' />
        )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='确认密码'
            hasFeedback
      >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请确认密码'
              }, {
                validator: checkPassword
              }]
            })(
              <Input type='password' />
        )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label=' '
            colon={false}
            className={styles.loginBTNItem}
            >
          <Button type="primary" htmlType="submit" className={styles.loginBTN} loading={loading}>
                    注册
          </Button>

        </FormItem>
        </Form>
      </div>

    </div>
  )
}

function mapStateToProps(state) {
  const isRegisterSuccess = state.studentRegister.isRegisterSuccess;
  const isRegisterDuplicate = state.studentRegister.isRegisterDuplicate;
  const isConnectionBad = state.studentRegister.isConnectionBad;

  return {
    loading: state.loading.models.studentRegister,
    isRegisterSuccess,
    isRegisterDuplicate,
    isConnectionBad
  };
}

export default connect(mapStateToProps)(Form.create()(RegStudent))
