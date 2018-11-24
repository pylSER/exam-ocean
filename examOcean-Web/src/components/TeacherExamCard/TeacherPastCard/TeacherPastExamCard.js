import React from 'react'
import { connect } from 'dva';
import { Card, Button, Icon,Menu,Popover } from 'antd'
import styles from './TeacherPastExamCard.css'
import { routerRedux } from 'dva/router';

function TeacherPastExamCard({ dispatch,cardData}) {

    function goToTranscript(){
        localStorage.setItem('transcriptExamInfo', JSON.stringify(cardData));
        dispatch(routerRedux.push({ pathname: '/transcript?examID='+cardData.examID}));
    }




    const dropdownMenu = (
        <div>
          <p className={styles.menuOpt} onClick={goToTranscript}>
            查看成绩和试卷
          </p>
          </div>
      );




    return ( 
        <Card className = { styles.classCard }
         title={cardData.examName}
         extra={ 
             <div style={{width:40}}>
             <a>
         <Popover  placement="bottomRight"  content={dropdownMenu} trigger="click">
         <Icon type="setting" style={{fontSize:17}}  />
       </Popover></a></div>}
         
         >

        <p className={styles.time+" "+styles.startTime}> {cardData.startDate} </p> 
        <p className={styles.time}> {cardData.endDate} </p>

       

        <p className = { styles.totalQuestion} >题目数:{cardData.questionNum}</p>
        <p className = { styles.totalPeople} >参与人数:{cardData.studentNum}</p>
    </Card>
    )
}

function mapStateToProps(state) {

    return {

    }
}

export default connect(mapStateToProps)(TeacherPastExamCard)