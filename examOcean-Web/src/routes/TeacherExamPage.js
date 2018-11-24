import React from 'react'
import { connect } from 'dva'
import styles from './TeacherExamPage.css'
import MainLayout from '../components/TeacherMainLayout/layout'
import TeacherExamCardLayout from '../components/TeacherExamCard/TeacherNowCard/TeacherNowExamCardLayout'
import TeacherPastExamCardLayout from '../components/TeacherExamCard/TeacherPastCard/TeacherPastExamCardLayout'
import TeacherFutureExamCardLayout from '../components/TeacherExamCard/TeacherFutureCard/TeacherFutureExamCardLayout'
import { Icon, Button, Tabs,notification,message } from 'antd'

const TabPane = Tabs.TabPane

function ExamPage ({dispatch, location,loading,currentList,finishedList,unStartedList,isConnectionBad}) {

  function onTabChange (key) {
    if(key=="now"){
      dispatch({
        type: 'teacherExam/getCurrentTeacherExam',
        payload: {}
    })
    }else if(key=="past"){
      dispatch({
        type: 'teacherExam/getPastTeacherExam',
        payload: {}
    })

    }else if(key=="future"){
      dispatch({
        type: 'teacherExam/getFutureTeacherExam',
        payload: {}
    })
    }
  }





  function clearNotificationState(){
    dispatch({
      type: 'teacherExam/save',
      payload: {
        currentList: [],
        finishedList:[],
        unStartedList:[],
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
      <Tabs defaultActiveKey='now'
          onChange={onTabChange}
          tabPosition='left'
          className={styles.tab}
          >
          <TabPane tab='未开始' key='future'><TeacherFutureExamCardLayout examData={unStartedList} /></TabPane>
          <TabPane tab='进行中' key='now'><TeacherExamCardLayout examData={currentList} /></TabPane>
          <TabPane tab='已结束' key='past'><TeacherPastExamCardLayout examData={finishedList} /></TabPane>
        </Tabs>

      </div>
    </MainLayout>
  )
}

ExamPage.propTypes = {
}

function mapStateToProps (state) {
  const currentList = state.teacherExam.currentList;
  const finishedList = state.teacherExam.finishedList;
  const unStartedList = state.teacherExam.unStartedList;

  const isConnectionBad = state.teacherExam.isConnectionBad;
  return {
    loading: state.loading.models.teacherExam,
    currentList,
    finishedList,
    unStartedList,
    isConnectionBad
  }
}

export default connect(mapStateToProps)(ExamPage)
