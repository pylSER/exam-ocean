import React from 'react'
import { connect } from 'dva';


import { routerRedux } from 'dva/router';
import Papers from './Papers';





function Exam({dispatch,exam,isAnswered}) {

    return ( 
        <div>
            <div>
                <h2>{exam.examName}<small>　共{exam.size}题</small></h2>
            </div>
            <br/>
            <div>
                <Papers papers={exam.papers} isAnswered={isAnswered} />
            </div>
        </div>
        
    )
}

function mapStateToProps(state) {

    return {
        
    }
}

export default connect(mapStateToProps)(Exam)