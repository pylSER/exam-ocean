import React from 'react'
import { connect } from 'dva';


import { routerRedux } from 'dva/router';
import {Collapse} from 'antd';
import OneQuestion from './OneQuestion';





function Paper({dispatch,questions,isAnswered}) {

    const Panel = Collapse.Panel;
    let questionsUI = [];

    for(let i = 1;i<=questions.length;i++){
        let panelHeader = '第'+i+'题'
        questionsUI.push(
            <Panel header={panelHeader} key = {i}>
                <OneQuestion questionData={questions[i-1]} isAnswered = {isAnswered} />
            </Panel>
        );
    }


    return ( 
        <Collapse bordered={false}>
            {questionsUI}
        </Collapse>
        
    )
}

function mapStateToProps(state) {

    return {
        
    }
}

export default connect(mapStateToProps)(Paper)