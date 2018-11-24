import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './login.css'
import { Card, Form, Icon, Input, Button, Checkbox,Radio,notification } from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

let selectedType=1;
const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  isLoginNameWrong,
  isLoginPasswordWrong,
  isConnectionBad,
  selectedType
}) => {




  function handleOk () {
     validateFieldsAndScroll((errors, values) => {
       if (errors) {
         return
       }else{
         let loginValues={values,selectedType}
         dispatch({ type: 'login/doLogin', payload: loginValues })
       }
     })
   }

   function onRadioChange (e) {
     let currselectedType =e.target.value
     dispatch({ type: 'login/updateType', payload: currselectedType })
    }

    function clearNotificationState(){
      dispatch({
        type: 'login/save',
        payload: {
          isLoginNameWrong: false,
          isLoginPasswordWrong: false,
          isConnectionBad: false
        }
    })
    }


    if(isLoginNameWrong){
      clearNotificationState();
      notification["error"]({
        message: '用户名错误',
        description: '',
        duration: 3,
      });
    }
    
    if(isLoginPasswordWrong){
      clearNotificationState();
      notification["error"]({
        message: '密码错误',
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

      <Card className={styles.loginCard} style={{ width: 400 }} noHovering>
        <div className={styles.title}>EXAM OCEAN</div>
        <Form onSubmit={handleOk}>

          <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请输入用户名'
              },
            ],
          })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} size="large"  placeholder="用户名" />)}
        </FormItem>

        <FormItem>
         {getFieldDecorator('password', {
           rules: [{ required: true, message: '请输入密码' }],
         })(
           <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" onPressEnter={handleOk} placeholder="密码" />
         )}
       </FormItem>

       <FormItem className={styles.radioGroup}>
       <RadioGroup onChange={onRadioChange} defaultValue={1}>
       <Radio value={1} >学生</Radio>
       <Radio value={2}>教师</Radio>
   </RadioGroup>
       
       </FormItem>

          <FormItem>
          <Button type="primary" htmlType="submit" className={styles.loginBTN} loading={loading}>
                    登录
          </Button>
           或者&nbsp;  <Link to="/register">立即注册!</Link>
        </FormItem>
        </Form>

      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  const isLoginNameWrong = state.login.isLoginNameWrong;
  const isLoginPasswordWrong = state.login.isLoginPasswordWrong;
  const isConnectionBad = state.login.isConnectionBad;
  const selectedType = state.login.selectedType;

  return {
    loading: state.loading.models.login,
    isLoginNameWrong,
    isLoginPasswordWrong,
    isConnectionBad,
    selectedType
  };
}



export default connect(mapStateToProps)(Form.create()(Login))
