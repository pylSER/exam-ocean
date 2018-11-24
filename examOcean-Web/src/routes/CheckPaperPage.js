import React from 'react'
import { connect } from 'dva'
import styles from './CheckPaperPage.css'
import MainLayout from '../components/TeacherMainLayout/layout'
// import Question from '../components/TeacherExamCard/PaperDetailCard/Question'
// import Answer from '../components/TeacherExamCard/PaperDetailCard/Answer'
// import OneQuestion from '../components/TeacherExamCard/PaperDetailCard/OneQuestion'
// import Paper from '../components/TeacherExamCard/PaperDetailCard/Paper'
import Exam from '../components/TeacherExamCard/PaperDetailCard/Exam'

import { Icon, Button, Tabs,notification,message } from 'antd'

const TabPane = Tabs.TabPane

function CheckPaper({dispatch, location,loading,exam,msg,isWrong,isConnectionBad}) {

  let test1 = {
    "examName": "软件过程管理",
    "size": 10,
    "papers": [
        {
            "stuName": "plw",
            "stuNum": "141250097",
            "totalScore": 10,
            "questions": [
                {
                    "questionBody": "问题1",
                    "options": [
                        "问题1答案1",
                        "问题1答案2",
                        "问题1答案3",
                        "问题1答案4"
                    ],
                    "selectedAnswer": [
                        2,
                        3
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题2",
                    "options": [
                        "问题2答案1",
                        "问题2答案2",
                        "问题2答案3",
                        "问题2答案4"
                    ],
                    "selectedAnswer": [],
                    "correctAnswer": [
                        2,
                        4
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题3",
                    "options": [
                        "问题3答案1",
                        "问题3答案2",
                        "问题3答案3",
                        "问题3答案4"
                    ],
                    "selectedAnswer": [
                        1,
                        2,
                        4
                    ],
                    "correctAnswer": [
                        2,
                        4
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题4",
                    "options": [
                        "问题4答案1",
                        "问题4答案2",
                        "问题4答案3",
                        "问题4答案4"
                    ],
                    "selectedAnswer": [
                        1
                    ],
                    "correctAnswer": [
                        2,
                        4
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题5",
                    "options": [
                        "问题5答案1",
                        "问题5答案2",
                        "问题5答案3",
                        "问题5答案4"
                    ],
                    "selectedAnswer": [
                        1,
                        3,
                        4
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题6",
                    "options": [
                        "问题6答案1",
                        "问题6答案2",
                        "问题6答案3",
                        "问题6答案4"
                    ],
                    "selectedAnswer": [
                        2,
                        4
                    ],
                    "correctAnswer": [
                        2,
                        4
                    ],
                    "score": 10,
                    "scoreGained": 10,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题7",
                    "options": [
                        "问题7答案1",
                        "问题7答案2",
                        "问题7答案3",
                        "问题7答案4"
                    ],
                    "selectedAnswer": [
                        4
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题8",
                    "options": [
                        "问题8答案1",
                        "问题8答案2",
                        "问题8答案3",
                        "问题8答案4"
                    ],
                    "selectedAnswer": [
                        2,
                        3
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题9",
                    "options": [
                        "问题9答案1",
                        "问题9答案2",
                        "问题9答案3",
                        "问题9答案4"
                    ],
                    "selectedAnswer": [
                        1,
                        2
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题10",
                    "options": [
                        "问题10答案1",
                        "问题10答案2",
                        "问题10答案3",
                        "问题10答案4"
                    ],
                    "selectedAnswer": [
                        1,
                        3,
                        4
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                }
            ]
        },
        {
            "stuName": "lhl",
            "stuNum": "141250080",
            "totalScore": 0,
            "questions": [
                {
                    "questionBody": "问题1",
                    "options": [
                        "问题1答案1",
                        "问题1答案2",
                        "问题1答案3",
                        "问题1答案4"
                    ],
                    "selectedAnswer": [
                        1
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题2",
                    "options": [
                        "问题2答案1",
                        "问题2答案2",
                        "问题2答案3",
                        "问题2答案4"
                    ],
                    "selectedAnswer": [],
                    "correctAnswer": [
                        2,
                        4
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题3",
                    "options": [
                        "问题3答案1",
                        "问题3答案2",
                        "问题3答案3",
                        "问题3答案4"
                    ],
                    "selectedAnswer": [
                        3,
                        4
                    ],
                    "correctAnswer": [
                        2,
                        4
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题4",
                    "options": [
                        "问题4答案1",
                        "问题4答案2",
                        "问题4答案3",
                        "问题4答案4"
                    ],
                    "selectedAnswer": [
                        1
                    ],
                    "correctAnswer": [
                        2,
                        4
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题5",
                    "options": [
                        "问题5答案1",
                        "问题5答案2",
                        "问题5答案3",
                        "问题5答案4"
                    ],
                    "selectedAnswer": [
                        1,
                        3
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题6",
                    "options": [
                        "问题6答案1",
                        "问题6答案2",
                        "问题6答案3",
                        "问题6答案4"
                    ],
                    "selectedAnswer": [
                        1,
                        2,
                        3,
                        4
                    ],
                    "correctAnswer": [
                        2,
                        4
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题7",
                    "options": [
                        "问题7答案1",
                        "问题7答案2",
                        "问题7答案3",
                        "问题7答案4"
                    ],
                    "selectedAnswer": [
                        1,
                        2,
                        3,
                        4
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题8",
                    "options": [
                        "问题8答案1",
                        "问题8答案2",
                        "问题8答案3",
                        "问题8答案4"
                    ],
                    "selectedAnswer": [
                        1,
                        3,
                        4
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题9",
                    "options": [
                        "问题9答案1",
                        "问题9答案2",
                        "问题9答案3",
                        "问题9答案4"
                    ],
                    "selectedAnswer": [
                        2,
                        3
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题10",
                    "options": [
                        "问题10答案1",
                        "问题10答案2",
                        "问题10答案3",
                        "问题10答案4"
                    ],
                    "selectedAnswer": [
                        3
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                }
            ]
        },
        {
            "stuName": "hks",
            "stuNum": "141250040",
            "totalScore": 0,
            "questions": [
                {
                    "questionBody": "问题1",
                    "options": [
                        "问题1答案1",
                        "问题1答案2",
                        "问题1答案3",
                        "问题1答案4"
                    ],
                    "selectedAnswer": [],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题2",
                    "options": [
                        "问题2答案1",
                        "问题2答案2",
                        "问题2答案3",
                        "问题2答案4"
                    ],
                    "selectedAnswer": [
                        1,
                        3,
                        4
                    ],
                    "correctAnswer": [
                        2,
                        4
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题3",
                    "options": [
                        "问题3答案1",
                        "问题3答案2",
                        "问题3答案3",
                        "问题3答案4"
                    ],
                    "selectedAnswer": [
                        1,
                        3,
                        4
                    ],
                    "correctAnswer": [
                        2,
                        4
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题4",
                    "options": [
                        "问题4答案1",
                        "问题4答案2",
                        "问题4答案3",
                        "问题4答案4"
                    ],
                    "selectedAnswer": [
                        2
                    ],
                    "correctAnswer": [
                        2,
                        4
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题5",
                    "options": [
                        "问题5答案1",
                        "问题5答案2",
                        "问题5答案3",
                        "问题5答案4"
                    ],
                    "selectedAnswer": [
                        2,
                        3,
                        4
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题6",
                    "options": [
                        "问题6答案1",
                        "问题6答案2",
                        "问题6答案3",
                        "问题6答案4"
                    ],
                    "selectedAnswer": [],
                    "correctAnswer": [
                        2,
                        4
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题7",
                    "options": [
                        "问题7答案1",
                        "问题7答案2",
                        "问题7答案3",
                        "问题7答案4"
                    ],
                    "selectedAnswer": [
                        1
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题8",
                    "options": [
                        "问题8答案1",
                        "问题8答案2",
                        "问题8答案3",
                        "问题8答案4"
                    ],
                    "selectedAnswer": [
                        1,
                        2,
                        4
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题9",
                    "options": [
                        "问题9答案1",
                        "问题9答案2",
                        "问题9答案3",
                        "问题9答案4"
                    ],
                    "selectedAnswer": [
                        1,
                        4
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                },
                {
                    "questionBody": "问题10",
                    "options": [
                        "问题10答案1",
                        "问题10答案2",
                        "问题10答案3",
                        "问题10答案4"
                    ],
                    "selectedAnswer": [
                        1
                    ],
                    "correctAnswer": [
                        4,
                        2
                    ],
                    "score": 10,
                    "scoreGained": 0,
                    "optionNum": 4
                }
            ]
        }
    ]
  }

  
  function onTabChange (key) {
    if(key=="now"){
      // test.examName = "now";
      dispatch({
        type: 'checkPaper/fetchPapers',
        payload: {
          examID:1,
          studentID:[1]
        }
    })
  }else if(key=="past"){
    // test.examName = "past";
      dispatch({
        type: 'checkPaper/fetchPapers',
        payload: {
          examID:1,
          studentID:[2]
        }
    })

  }else if(key=="future"){
    // test.examName = "future";
      dispatch({
        type: 'checkPaper/fetchPapers',
        payload: {
          examID:1,
          studentID:[3]
        }
    })
    }
  }


  function clearNotificationState(){
    dispatch({
      type: 'checkPaper/save',
      payload: {
        exam : {},
        msg : {},
        isWrong : false,
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
/* <Question questionData={test1.papers[0].questions[0]}/><Answer questionData = {test1.papers[0].questions[0]}/></TabPane> */
  

  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
      <Tabs defaultActiveKey='past'
          onChange={onTabChange}
          tabPosition='left'
          className={styles.tab}
          >
          <TabPane tab='未开始' key='future'><Exam exam = {test1} isAnswered={false}/></TabPane>
          <TabPane tab='进行中' key='now'><Exam exam = {test1} isAnswered={true}/></TabPane>
          <TabPane tab='已结束' key='past'><Exam exam = {test1} isAnswered={false}/></TabPane>
        </Tabs>

      </div>
    </MainLayout>
  )
}

CheckPaper.propTypes = {
}

function mapStateToProps (state) {
  const exam = state.checkPaper.exam;
  const msg =state.checkPaper.msg;
  const isWrong = state.checkPaper.isWrong;
  const isConnectionBad = state.checkPaper.isConnectionBad;
  return {
    loading: state.loading.models.checkPaper,
    exam,
    msg,
    isWrong,
    isConnectionBad
  }
}

export default connect(mapStateToProps)(CheckPaper)
