import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styles from './RegisterTeacherPage.css'
import { Icon, Form, Input,Button,notification } from 'antd'
import Header from '../components/MainLayout/headerReg'
const FormItem = Form.Item

const RegTeacher = ({
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
        dispatch({ type: 'teacherRegister/registerTeacher', payload: values });
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
      type: 'teacherRegister/save',
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
          教师注册
        </div>

      <div className={styles.typeRow}>
        <Form onSubmit={handleOk} className={styles.regForm}>
          <FormItem
            {...formItemLayout}
            label='用户名'
            hasFeedback
                >
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: '请输入用户名'
              }]
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
  const isRegisterSuccess = state.teacherRegister.isRegisterSuccess;
  const isRegisterDuplicate = state.teacherRegister.isRegisterDuplicate;
  const isConnectionBad = state.teacherRegister.isConnectionBad;

  return {
    loading: state.loading.models.teacherRegister,
    isRegisterSuccess,
    isRegisterDuplicate,
    isConnectionBad
  };
}

export default connect(mapStateToProps)(Form.create()(RegTeacher))
