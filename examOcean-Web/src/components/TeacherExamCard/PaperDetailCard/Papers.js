import React from 'react'
import { connect } from 'dva';


import { routerRedux } from 'dva/router';
import {Collapse} from 'antd';
import Paper from './Paper';





function Papers({dispatch,papers,isAnswered}) {

    const Panel = Collapse.Panel;
    let papersUI = [];

    for(let i = 1;i<=papers.length;i++){
        let paper = papers[i-1];
        let panelHeader = paper.stuNum+'　'+paper.stuName+'　'+paper.totalScore;
        papersUI.push(
            <Panel header={panelHeader} key = {i}>
                <Paper questions={paper.questions} isAnswered = {isAnswered} />
            </Panel>
        );
    }


    return ( 
        <Collapse>
            {papersUI}
        </Collapse>
        
    )
}

function mapStateToProps(state) {

    return {
        
    }
}

export default connect(mapStateToProps)(Papers)