import React from 'react'
import { connect } from 'dva'
import { Link ,routerRedux} from 'dva/router'
import styles from './ImportQuestion.css'
import { Icon, Form, Input,Button,Upload,message,notification } from 'antd'
import MainLayout from '../components/TeacherMainLayout/layout'
const FormItem = Form.Item;
const Dragger = Upload.Dragger;

const ImportQuestion = ({
  loading,
  location,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldValue,
    validateFields
  },
  fileList,
  isConnectionBad,
  isUploadSucces,
  tipMsg,
  isUploadError
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

  const uploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: true,
    accept:".xlsx",
    action: '//jsonplaceholder.typicode.com/posts/',
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      dispatch({ type: 'importQuestion/uploadFileList', payload: newFileList });
    },
    beforeUpload: (file) => {
      let newFileList=[file];
      dispatch({ type: 'importQuestion/uploadFileList', payload: newFileList });
      return false;
    },
    fileList: fileList,
  };

  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      } else {
    
        const formData = new FormData();
        fileList.forEach((file) => {
          formData.append('upload', file);
        });
        formData.append('courseName', values.libName);
        formData.append('description', values.libDesc);

        dispatch({ type: 'importQuestion/importQuestion', payload: formData });
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
      type: 'importQuestion/save',
      payload: {
        isUploadSucces: false,
        isConnectionBad: false,
        tipMsg:'',
        isUploadError:false
      }
  })
  }


  function clearNotificationStateSuccess(){
    dispatch({
      type: 'importQuestion/save',
      payload: {
        isUploadSucces: false,
        isConnectionBad: false,
        fileList:[],
        tipMsg:'',
        isUploadError:false
      }
  })
  }

  if(isUploadSucces){
    clearNotificationStateSuccess();
    notification["success"]({
      message: '导入成功!',
      description: '',
      duration: 1,
      onClose:function(){
        dispatch(routerRedux.replace('/teacher/questionlib'));
      }
    });
  }

  if(isUploadError){
    clearNotificationState();
    notification["error"]({
      message: '导入失败',
      description: tipMsg,
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
         <MainLayout location={location}>
      <div className={styles.normal}>
      <div className={styles.role}>
          导入题库
        </div>

      <div className={styles.typeRow}>
        <Form onSubmit={handleOk} className={styles.regForm}>
          <FormItem
            {...formItemLayout}
            label='题库名称'
            hasFeedback
                >
            {getFieldDecorator('libName', {
              rules: [{
                required: true, message: '请输入题库名称'
              }]
            })(
              <Input />
                  )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label='描述'
            hasFeedback
                >
            {getFieldDecorator('libDesc', {
              rules: [{
                required: false, message: ''
              }]
            })(
              <Input />
                  )}
          </FormItem>


          <FormItem
            {...formItemLayout}
            label=' '
            colon={false}
            className={styles.loginBTNItem}
            >
          <Dragger {...uploadProps}>
            <div>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或将文件拖拽到此处上传</p>
            <p className="ant-upload-hint">仅支持模版格式</p>
            </div>
          </Dragger> 

        </FormItem>

        <FormItem
            {...formItemLayout}
            label=' '
            colon={false}
            >
           <a href="/file/template/question" target="_blank" className={styles.templateDownload}><Icon type="file-excel"  /> 下载题库模版</a>

        </FormItem>

        
       

          <FormItem
            {...formItemLayout}
            label=' '
            colon={false}
            className={styles.loginBTNItem}
            >
          <Button type="primary" htmlType="submit" className={styles.loginBTN} loading={loading} disabled={fileList.length === 0}>
                    导入
          </Button>

        </FormItem>
        </Form>
      </div>

      </div>
      </MainLayout>

    </div>
  )
}


function mapStateToProps(state) {
  const fileList = state.importQuestion.fileList;
  const isConnectionBad = state.importQuestion.isConnectionBad;
  const isUploadSucces = state.importQuestion.isUploadSucces;
  const tipMsg=state.importQuestion.tipMsg;
  const isUploadError=state.importQuestion.isUploadError;

  return {
    loading: state.loading.models.importQuestion,
    fileList,
    isConnectionBad,
    isUploadSucces,
    tipMsg,
    isUploadError
  };
}

export default connect(mapStateToProps)(Form.create()(ImportQuestion))
