import React from 'react'
import { connect } from 'dva';
import { Card, Icon } from 'antd'
import styles from './ResultCard.css'

function ResultCard({ dispatch, cardData }) {


    return ( 
    <Card className = { styles.ResultCard } >
        <div className = { styles.examTitle } > {cardData.examName}</div>

        <p className = { styles.examTime + ' ' + styles.examStartTime } > {cardData.startDate}</p> 
        <p className = { styles.examTime + ' ' + styles.examEndTime } > {cardData.endDate}</p>

        <h1 className={styles.score}> {cardData.score}</h1>

        <p className = { styles.examTime + ' ' + styles.examEndTime } >总分: {cardData.totalScore}</p>

        </Card>
    )
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(ResultCard)