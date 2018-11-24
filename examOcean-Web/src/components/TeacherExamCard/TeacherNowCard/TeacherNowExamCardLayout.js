import React from 'react'
import { Row, Col,Icon } from 'antd'
import styles from './TeacherNowExamCardLayout.css'
import TeacherNowCardRow from './TeacherNowCardRow'
import { Link } from 'dva/router';

function TeacherNowExamCardLayout ({ location,examData }) {
  let currentExamListUI=[];

  let i=0;
  let rowData=[];

  for(i=0;i<examData.length;i++){
  if(i%4==0&&i!=0){
    currentExamListUI.push(<TeacherNowCardRow key={i} rowData={rowData} />);
    rowData=[];
  }

  rowData.push(examData[i]);


  if(i==(examData.length-1)&&examData.length%4!=0){
    currentExamListUI.push(<TeacherNowCardRow key={i+1} rowData={rowData} />);
    rowData=[];
  }

  }





  return (

    <div>
      <div style={{marginTop:"10px",paddingBottom:"10px"}}>
      <Link to="/teacher/publishExam"><a className={styles.add} ><Icon type="plus-circle-o" />    添加一场考试...</a></Link>
      </div>
      {currentExamListUI}

       {((currentExamListUI.length==0))&&
        <h1 style={{textAlign:"center",color:"grey",marginTop:"10%"}}>无数据</h1>
      }
    </div>
  )
}

export default TeacherNowExamCardLayout
