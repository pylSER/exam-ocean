import React from 'react'
import { connect } from 'dva';


import { routerRedux } from 'dva/router';


function Answer({dispatch,questionData}) {

    function getLabel(text){
        return (<span><b>[{text}]　</b></span>);
    }

    function getChar(num){
        let begin = 'A';
        return String.fromCharCode(begin.charCodeAt(0)+num);
    }
    
    let choicesUI=[];
    choicesUI.push(getLabel('学生选择'));
    for(let i = 0 ;i<questionData.selectedAnswer.length;i++){
        choicesUI.push(<span>{getChar(questionData.selectedAnswer[i]-1)}　</span>);

    }
    
    return ( 
        <div>
            <div>
                {choicesUI}
            </div>
            <div>
                {getLabel('本题得分')}{questionData.scoreGained}分
            </div>
        </div>
    )
}

function mapStateToProps(state) {

    return {
        
    }
}

export default connect(mapStateToProps)(Answer)