import React from 'react'
import { connect } from 'dva';
import {Card, Icon,Popover} from 'antd'
import styles from './TeacherFutureExamCard.css'

function TeacherFutureExamCard({ dispatch,cardData}) {
    const dropdownMenuFuture = (
        <div>
          <p className={styles.menuOpt}>
            生成试卷
          </p>
          <p className={styles.menuOpt+" "+styles.menuOptReg}>
            取消考试
          </p>
          </div>
      );


    return ( 
        <Card className = { styles.classCard }
        title={cardData.examName}
        extra={ 
            <div style={{width:40}}>
            <a>
        <Popover  placement="bottomRight"  content={dropdownMenuFuture} trigger="click">
        <Icon type="setting" style={{fontSize:17}}  />
      </Popover></a></div>}

        
      >

        <p className={styles.time+" "+styles.startTime}>{cardData.startDate} </p> 
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

export default connect(mapStateToProps)(TeacherFutureExamCard)