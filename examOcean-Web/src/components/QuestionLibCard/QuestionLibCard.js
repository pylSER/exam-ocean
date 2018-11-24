import React from 'react'
import { connect } from 'dva';
import { Card, Icon } from 'antd'
import styles from './QuestionLibCard.css'

function QuestionLibCard({ dispatch,cardData }) {
    let desc="";


    if((!cardData.description)||cardData.description==""){
        desc="无描述";
    }else{
        desc=cardData.description;
    }


    return ( 
    <Card className = { styles.QuestionLibCard } title={cardData.name} >
        <p className = { styles.classDesc } >{desc}</p>

        <p className = { styles.total} >题目数:{cardData.num}</p>

        </Card>
    )
}

function mapStateToProps(state) {
    return {
 
    }
}

export default connect(mapStateToProps)(QuestionLibCard)