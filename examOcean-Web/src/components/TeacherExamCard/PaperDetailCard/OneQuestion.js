import React from 'react'
import { connect } from 'dva';


import { routerRedux } from 'dva/router';
import Question from './Question';
import Answer from './Answer';





function OneQuestion({dispatch,questionData,isAnswered}) {

    


    return ( 
        <div>
            <Question questionData={questionData}/>
            {(isAnswered==true)&&<Answer questionData={questionData}/>}
            
        </div>
        
    )
}

function mapStateToProps(state) {

    return {
        
    }
}

export default connect(mapStateToProps)(OneQuestion)