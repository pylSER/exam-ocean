import React from 'react'
import { connect } from 'dva'
import styles from './TeacherQuestionPage.css'
import MainLayout from '../components/TeacherMainLayout/layout'
import QuestionLibCardRow from '../components/QuestionLibCard/QuestionLibRow';
import { Link } from 'dva/router';

import {  Input, Icon,message,notification } from 'antd'


function Question ({dispatch, location,loading,questionCardListUI,isConnectionBad}) {



  function clearNotificationState(){
    dispatch({
      type: 'teacherQuestion/save',
      payload: {
        questionCardList: [],
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
        <Link to="/teacher/questionlib/import"><a className={styles.add}><Icon type="plus-circle-o" />    添加一个题库...</a></Link>

<div>
       {questionCardListUI}

       {(isConnectionBad||(questionCardListUI.length==0))&&
        <h1 style={{textAlign:"center",color:"grey",marginTop:"10%"}}>无数据</h1>
      }

       
</div>

      </div>
    </MainLayout>
  )
}

Question.propTypes = {
}

function mapStateToProps(state) {
  const questionCardList = state.teacherQuestion.questionCardList;
  const isConnectionBad = state.teacherQuestion.isConnectionBad;

  let questionCardListUI=[];


  let i=0;
  let rowData=[];

  for(i=0;i<questionCardList.length;i++){
  if(i%4==0&&i!=0){
    questionCardListUI.push(<QuestionLibCardRow key={i} rowData={rowData} />);
    rowData=[];
  }

  rowData.push(questionCardList[i]);


  if(i==(questionCardList.length-1)&&questionCardList.length%4!=0){
    questionCardListUI.push(<QuestionLibCardRow key={i+1} rowData={rowData} />);
    rowData=[];
  }

  }



  return {
    loading: state.loading.models.teacherQuestion,
    questionCardListUI,
    isConnectionBad,
  };
}

export default connect(mapStateToProps)(Question)
