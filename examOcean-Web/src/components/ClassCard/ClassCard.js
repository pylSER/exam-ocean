import React from 'react'
import { connect } from 'dva';
import { Card, Icon } from 'antd'
import styles from './ClassCard.css'

function ClassCard({ dispatch,cardData }) {

    let desc="";
    
    
        if((!cardData.description)||cardData.description==""){
            desc="无描述";
        }else{
            desc=cardData.description;
        }
    


    return ( 
    <Card className = { styles.ClassCard } title={cardData.name} >
        <p className = { styles.classDesc } >{desc}</p>

        <p className = { styles.total} >人数:{cardData.num}</p>

        </Card>
    )
}

function mapStateToProps(state) {
    return {
 
    }
}

export default connect(mapStateToProps)(ClassCard)