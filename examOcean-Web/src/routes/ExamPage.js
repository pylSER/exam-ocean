import React from 'react'
import { connect } from 'dva'
import styles from './ExamPage.css'
import MainLayout from '../components/MainLayout/layout'
import NowExamCardLayout from '../components/ExamCard/NowExamCard/ExamCardLayout'
import PastExamCardLayout from '../components/ExamCard/PastExamCard/PastExamCardLayout'
import FutureExamCardLayout from '../components/ExamCard/FutureExamCard/FutureExamCardLayout'
import { Card, Spin, Input, Icon, Button, Tabs,notification,message } from 'antd'

const TabPane = Tabs.TabPane

function ExamPage ({dispatch, location, currentList, loading,finishedList,unStartedList,isConnectionBad}) {

  function onTabChange (key) {
    if(key=="now"){
      dispatch({
        type: 'studentExam/getCurrentStudentExam',
        payload: {}
    })
    }else if(key=="past"){
      dispatch({
        type: 'studentExam/getPastStudentExam',
        payload: {}
    })

    }else if(key=="future"){
      dispatch({
        type: 'studentExam/getFutureStudentExam',
        payload: {}
    })
    }
  }


  function clearNotificationState(){
    dispatch({
      type: 'studentExam/save',
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
          <TabPane tab='未开始' key='future'><FutureExamCardLayout examData={unStartedList} /></TabPane>
          <TabPane tab='进行中' key='now'><NowExamCardLayout examData={currentList}/></TabPane>
          <TabPane tab='已结束' key='past'><PastExamCardLayout examData={finishedList}/></TabPane>
        </Tabs>

      </div>
    </MainLayout>
  )
}

ExamPage.propTypes = {
}

function mapStateToProps (state) {
  const currentList = state.studentExam.currentList;
  const finishedList = state.studentExam.finishedList;
  const unStartedList = state.studentExam.unStartedList;

  const isConnectionBad = state.studentExam.isConnectionBad;
  return {
    loading: state.loading.models.studentExam,
    currentList,
    finishedList,
    unStartedList,
    isConnectionBad
  }
}

export default connect(mapStateToProps)(ExamPage)
