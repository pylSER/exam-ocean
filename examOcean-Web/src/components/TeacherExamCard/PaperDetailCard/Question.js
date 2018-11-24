import React from 'react'
import { connect } from 'dva';


import { routerRedux } from 'dva/router';



function Question({dispatch,questionData}) {

    function getLabel(text){
        return (<span><b>[{text}]　</b></span>);
    }

    function getChar(num){
        let begin = 'A';
        return String.fromCharCode(begin.charCodeAt(0)+num);
    }
    
    let optionsUI=[];
    optionsUI.push(getLabel('备选选项'));
    for(let i = 0 ;i<questionData.optionNum;i++){
        
        // let option = '';
        optionsUI.push(<span>{getChar(i)}.{questionData.options[i]}　</span>);

    }
    let answersUI=[];
    answersUI.push(getLabel('正确答案'));
    for(let i = 0 ;i<questionData.correctAnswer.length;i++){
        
        // let option = '';
        answersUI.push(<span>{getChar(questionData.correctAnswer[i]-1)}　</span>);

    }
    

    return ( 
        <div>
            <div>
                {getLabel('题干内容')}{questionData.questionBody}
            </div>
            <div>
                {optionsUI}
            </div>
            <div>
                {answersUI}
            </div>
            <div>
                {getLabel('本题分值')}{questionData.score}分
            </div>
            
            
        </div>
    )
}

function mapStateToProps(state) {

    return {
        
    }
}

export default connect(mapStateToProps)(Question)