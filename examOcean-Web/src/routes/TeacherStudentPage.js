import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router';
import styles from './TeacherStudentPage.css'
import MainLayout from '../components/TeacherMainLayout/layout'
import ClassCardRow from '../components/ClassCard/ClassCardRow';

import { Icon,notification,message } from 'antd'

function Student ({dispatch, location,loading,classListUI,isConnectionBad}) {

  function clearNotificationState(){
    dispatch({
      type: 'teacherClass/save',
      payload: {
        classList: [],
        isConnectionBad: false,
      }
  })
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
    <MainLayout location={location}>
      <div className={styles.normal}>
      <Link to="/teacher/student/import"><a className={styles.add}><Icon type="plus-circle-o" />    添加一个班级...</a></Link>

      <div>
        {classListUI}

       {(isConnectionBad||(classListUI.length==0))&&
        <h1 style={{textAlign:"center",color:"grey",marginTop:"10%"}}>无数据</h1>
      }
      
      </div>


      </div>
    </MainLayout>
  )
}

Student.propTypes = {
}

function mapStateToProps(state) {
  const classList = state.teacherClass.classList;
  const isConnectionBad = state.teacherClass.isConnectionBad;

  let classListUI=[];


  let i=0;
  let rowData=[];

  for(i=0;i<classList.length;i++){
  if(i%4==0&&i!=0){
    classListUI.push(<ClassCardRow key={i} rowData={rowData} />);
    rowData=[];
  }

  rowData.push(classList[i]);


  if(i==(classList.length-1)&&classList.length%4!=0){
    classListUI.push(<ClassCardRow key={i+1} rowData={rowData} />);
    rowData=[];
  }

  }



  return {
    loading: state.loading.models.teacherClass,
    classListUI,
    isConnectionBad,
  };
}

export default connect(mapStateToProps)(Student)
