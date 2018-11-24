import React from 'react'
import { connect } from 'dva'
import styles from './TeacherPublishStepFirst.css'

import { Icon, Form, Input,Button,Select,InputNumber,DatePicker,Modal } from 'antd'
const FormItem = Form.Item
const Option = Select.Option;
const { RangePicker } = DatePicker;
const confirm = Modal.confirm;

const TeacherPublishStepFirst = ({
    loading,
    dispatch,
    form: {
      getFieldDecorator,
      validateFieldsAndScroll,
      getFieldValue,
      validateFields
    }
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
          console.log(values)
        }

        let total=values["input-number"]*values["input-score"];

        confirm({
          title: '确定要生成考试吗?',
          content: '试卷总分:'+total,
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });

       
        //  dispatch({ type: 'login/login', payload: values })/
      })
    }

    function onTimeOk(value) {
        console.log('onOk: ', value);
    }

  
    return (
      <div>
       
        <div className={styles.role}>
            配置考试
          </div>
  
        <div className={styles.typeRow}>
          <Form onSubmit={handleOk} className={styles.regForm}>
            <FormItem
              {...formItemLayout}
              label='考试名称'
              hasFeedback
                  >
              {getFieldDecorator('examname', {
                rules: [{
                  required: true, message: '请输入考试名称'
                }]
              })(
                <Input />
                    )}
            </FormItem>

    <FormItem
          {...formItemLayout}
          label="题库"
          hasFeedback
        >
          {getFieldDecorator('selectQuestionLib', {
            rules: [
              { required: true, message: '请选择题库' },
            ],
          })(
            <Select placeholder="题库名">
              <Option value="china">计组期中考试大全</Option>
              <Option value="usa">软工期末考试</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="题目数"
          style={{textAlign:"left"}}
        >
          {getFieldDecorator('input-number', { 
              initialValue: 1,
          rules: [
              { required: true, message: '请输入题目数' },
            ], })(
              
            <InputNumber min={1} max={999}  />
            
            
          )}
          <span className={styles.questionTip}>题目会从题库随机抽取</span>
         
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="每题得分"
          style={{textAlign:"left"}}
        >
          {getFieldDecorator('input-score', { 
              initialValue: 1,
          rules: [
              { required: true, message: '请输入得分' },
            ], })(
            <InputNumber  min={1} max={999}  />
          )}
         
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="班级"
          hasFeedback
        >
          {getFieldDecorator('selectStudent', {
            rules: [
              { required: true, message: '请选择班级' },
            ],
          })(
            <Select placeholder="班级名">
              <Option value="china">14级大一班</Option>
              <Option value="usa">18级小三班</Option>
            </Select>
          )}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="设定时间"
          hasFeedback
        >
          {getFieldDecorator('selectTime', {
            rules: [
              { required: true, message: '请选择时间' },
            ],
          })(
            <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder={['开始时间', '结束时间']}
            onOk={onTimeOk}
          />
          )}
        </FormItem>

  
            <FormItem
              {...formItemLayout}
              label=' '
              colon={false}
              className={styles.loginBTNItem}
              >
            <Button type="primary" htmlType="submit" className={styles.loginBTN}>
                      生成考试
            </Button>
  
          </FormItem>
          </Form>
        </div>
  
      </div>
    )
  }

  export default connect(({ loading }) => ({ loading }))(Form.create()(TeacherPublishStepFirst))
  