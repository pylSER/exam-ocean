import React from 'react'
import { Row, Col } from 'antd'
import styles from './PastExamCardLayout.css'
import PastExamCardRow from './PastExamCardRow'

function PastExamCardLayout ({ location,examData }) {

  let pastExamListUI=[];
  
    let i=0;
    let rowData=[];
  
    for(i=0;i<examData.length;i++){
    if(i%4==0&&i!=0){
      pastExamListUI.push(<PastExamCardRow key={i} rowData={rowData} />);
      rowData=[];
    }
  
    rowData.push(examData[i]);
  
  
    if(i==(examData.length-1)&&examData.length%4!=0){
      pastExamListUI.push(<PastExamCardRow key={i+1} rowData={rowData} />);
      rowData=[];
    }
  
    }


  return (

    <div>
       {pastExamListUI}
       
              {((pastExamListUI.length==0))&&
               <h1 style={{textAlign:"center",color:"grey",marginTop:"10%"}}>无数据</h1>
             }
    </div>
  )
}

export default PastExamCardLayout
