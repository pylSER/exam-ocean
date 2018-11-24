import React from 'react';
import { connect } from 'dva';
import { Row, Col,notification,message,Icon,Table } from 'antd'
import styles from './TranscriptPage.css';
import MainLayout from '../components/TeacherMainLayout/layout';



function TranscriptPage({dispatch,location,loading,isConnectionBad,transcriptList,examInfo}) {


  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '学号',
    dataIndex: 'number',
    key: 'number',
  }, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: '得分',
    dataIndex: 'score',
    key: 'score',
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="#">生成试卷</a>
      </span>
    ),
  }];

  function clearNotificationState(){
    dispatch({
      type: 'transcript/save',
      payload: {
        transcriptList: [],
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


  let downloadURL="/download/scoreList/"+examInfo.examID;


  return (
    <MainLayout location={location}>
    <div className={styles.normal}>

        <h1>{examInfo.examName}</h1>

        <div className={styles.header}>
        <h3 className={styles.info}>{examInfo.startDate} ~ {examInfo.endDate}</h3>

        <h3 className={styles.info}>参与人数:{examInfo.studentNum}</h3>

        <h3 className={styles.info}>题目数:{examInfo.questionNum}</h3>

        <h3 className={styles.info}>总分:{examInfo.totalScore}</h3>

        </div>


      
    </div>

    <div className={styles.tableArea}>
        <a className={styles.add} href={downloadURL} target="_blank"><Icon type="cloud-download-o" />    下载成绩单...</a>


        <Table className={styles.scoreTable} columns={columns} dataSource={transcriptList} />


  </div>

    </MainLayout>
  );
}

TranscriptPage.propTypes = {
};


function mapStateToProps(state) {
  const isConnectionBad = state.transcript.isConnectionBad;
  const transcriptList = state.transcript.transcriptList;
  let examInfo=localStorage.getItem("transcriptExamInfo");
  examInfo=JSON.parse(examInfo);

  return {
    loading: state.loading.models.transcript,
    isConnectionBad,
    transcriptList,
    examInfo
  };
}

export default connect(mapStateToProps)(TranscriptPage);
