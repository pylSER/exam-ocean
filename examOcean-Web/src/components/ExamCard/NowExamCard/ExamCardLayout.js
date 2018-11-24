import React from 'react'
import { Row, Col } from 'antd'
import styles from './ExamCardLayout.css'
import ExamCardRow from './ExamCardRow'

function ExamCardLayout ({ location,examData }) {


  let currentExamListUI=[];
  
    let i=0;
    let rowData=[];
  
    for(i=0;i<examData.length;i++){
    if(i%4==0&&i!=0){
      currentExamListUI.push(<ExamCardRow key={i} rowData={rowData} />);
      rowData=[];
    }
  
    rowData.push(examData[i]);
  
  
    if(i==(examData.length-1)&&examData.length%4!=0){
      currentExamListUI.push(<ExamCardRow key={i+1} rowData={rowData} />);
      rowData=[];
    }
  
    }
  return (

    <div>
       {currentExamListUI}
       
              {((currentExamListUI.length==0))&&
               <h1 style={{textAlign:"center",color:"grey",marginTop:"10%"}}>无数据</h1>
             }
    </div>
  )
}

export default ExamCardLayout
