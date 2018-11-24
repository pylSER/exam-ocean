import React from 'react'
import { connect } from 'dva';
import { Card, Button, Icon } from 'antd'
import styles from './TeacherNowExamCard.css'

function TeacherNowExamCard({dispatch,cardData}) {


    return ( 
        <Card className = { styles.classCard } title={cardData.examName} >
            <p className={styles.time+" "+styles.startTime}>{cardData.startDate}</p> 
            <p className={styles.time}>{cardData.endDate}</p>

            <p className = { styles.totalQuestion} >题目数:{cardData.questionNum}</p>
            <p className = { styles.totalPeople} >参与人数:{cardData.studentNum}</p>
        </Card>
    )
}

function mapStateToProps(state) {
    return {
       
    }
}

export default connect(mapStateToProps)(TeacherNowExamCard)
