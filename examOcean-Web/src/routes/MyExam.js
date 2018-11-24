import React from 'react';
import { connect } from 'dva';
import { Row, Col,notification,message } from 'antd'
import styles from './MyExam.css';
import MainLayout from '../components/MainLayout/layout';
import ResultCardRow from '../components/ResultCard/ResultCardRow';



function MyExam({dispatch,location,loading,isConnectionBad,myExamListUI}) {



  function clearNotificationState(){
    dispatch({
      type: 'myExam/save',
      payload: {
        myExamList: [],
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



    <h1 className={styles.resultTitle}>考试记录</h1>

    {myExamListUI}
       {(isConnectionBad||(myExamListUI.length==0))&&
        <h1 style={{textAlign:"center",color:"grey",marginTop:"10%"}}>无数据</h1>
      }

      
    </div>
    </MainLayout>
  );
}

MyExam.propTypes = {
};




function mapStateToProps(state) {
  const isConnectionBad = state.myExam.isConnectionBad;
  const myExamList = state.myExam.myExamList;



  let myExamListUI=[];
  
  
    let i=0;
    let rowData=[];
  
    for(i=0;i<myExamList.length;i++){
    if(i%4==0&&i!=0){
      myExamListUI.push(<ResultCardRow key={i} rowData={rowData} />);
      rowData=[];
    }
  
    rowData.push(myExamList[i]);
  
  
    if(i==(myExamList.length-1)&&myExamList.length%4!=0){
      myExamListUI.push(<ResultCardRow key={i+1} rowData={rowData} />);
      rowData=[];
    }
  
    }
  


  return {
    loading: state.loading.models.myExam,
    isConnectionBad,
    myExamListUI
  };
}

export default connect(mapStateToProps)(MyExam);
