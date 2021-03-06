import React from 'react'
import { connect } from 'dva';
import { Row,Col,Icon } from 'antd'
import StudentCurrentExamCard from './ExamCard';

function StudentCurrentExamCardRow({ dispatch,rowData }) {

    let cardUI=[];
    let i=0;
    for(i=0;i<rowData.length;i++){
        cardUI.push(<Col key={i} span={6}><StudentCurrentExamCard  cardData={rowData[i]}/></Col>);
    }


    return ( 
    <Row style={{marginTop:"10px",paddingBottom:"10px"}} gutter={10}>
        {cardUI}
    </Row>
    )
}

function mapStateToProps(state) {
    return {
 
    }
}

export default connect(mapStateToProps)(StudentCurrentExamCardRow)