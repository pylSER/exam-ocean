import React from 'react'
import { connect } from 'dva';
import { Row, Col, Card, Button, Icon, Modal,Input } from 'antd'
import styles from './FutureExamCard.css'

function FutureExamCard({ dispatch,cardData }) {


    return ( 
    <Card className = { styles.examCard } >
        <div className = { styles.examTitle } > { cardData.examName } </div>

        <p className = { styles.examTime + ' ' + styles.examStartTime } > { cardData.startDate } </p> 
        <p className = { styles.examTime + ' ' + styles.examEndTime } >{ cardData.endDate } </p>


        </Card>
    )
}

function mapStateToProps(state) {

    return {

    }
}

export default connect(mapStateToProps)(FutureExamCard)