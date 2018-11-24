import React from 'react'
import { Row, Col } from 'antd'
import styles from './TeacherFutureExamCardLayout.css'
import TeacherFutureCardRow from './TeacherFutureCardRow'

function TeacherFutureExamCardLayout ({ location,examData }) {

  let futureExamListUI=[];
  
    let i=0;
    let rowData=[];
  
    for(i=0;i<examData.length;i++){
    if(i%4==0&&i!=0){
      futureExamListUI.push(<TeacherFutureCardRow key={i} rowData={rowData} />);
      rowData=[];
    }
  
    rowData.push(examData[i]);
  
  
    if(i==(examData.length-1)&&examData.length%4!=0){
      futureExamListUI.push(<TeacherFutureCardRow key={i+1} rowData={rowData} />);
      rowData=[];
    }
  
    }
  
  return (

    <div>
      {futureExamListUI}
      
             {((futureExamListUI.length==0))&&
              <h1 style={{textAlign:"center",color:"grey",marginTop:"10%"}}>无数据</h1>
            }
    </div>
  )
}

export default TeacherFutureExamCardLayout
