import React from 'react'
import { connect } from 'dva';
import { Row, Col, Card, Button, Icon } from 'antd'
import styles from './PastExamCard.css'

function PastExamCard({ dispatch,cardData }) {


    return ( 
    <Card className = { styles.examCard } >
        <div className = { styles.examTitle } > { cardData.examName } </div>

        <p className = { styles.examTime + ' ' + styles.examStartTime } > { cardData.startDate } </p> 
        <p className = { styles.examTime + ' ' + styles.examEndTime } > { cardData.endDate } </p>


        </Card>
    )
}

function mapStateToProps(state) {

    return {

    }
}

export default connect(mapStateToProps)(PastExamCard)