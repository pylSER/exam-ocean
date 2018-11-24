import React from 'react'
import { connect } from 'dva';
import { Row, Col, Card, Button, Icon, Modal,Input } from 'antd'
import styles from './ExamCard.css'

function ExamCard({ dispatch, modalVisible,examName, cardData,isConfirmed,isPwdError }) {

    console.log(cardData);

    let exampwd="";

    function onPwdChange(event){
        exampwd=event.target.value;
    }


    function showModal(examID) {
        dispatch({ type: 'exam/showEnterExamModal', payload: cardData.examName })
    }

    function handleOk(e) {
        
        let mypayload={
            key:exampwd,
            examID:cardData.examID
        }
        dispatch({ type: 'exam/checkExamPWD', payload: mypayload })
    }

    function handleCancel(e) {
        dispatch({ type: 'exam/closeEnterExamModal', payload: cardData.examName })
    }

    return ( 
    <Card className = { styles.examCard } >
        <div className = { styles.examTitle } > { cardData.examName } </div>

        <p className = { styles.examTime + ' ' + styles.examStartTime } >{ cardData.startDate } </p> 
        <p className = { styles.examTime + ' ' + styles.examEndTime } > { cardData.endDate } </p>


{(!cardData.isFinished) &&

    <div>
    <Button className = { styles.examBTN }
    onClick = { showModal }
    icon = "edit"
    size = "large" > 开始考试 
    </Button>

<Modal 
title = {examName}
visible = { modalVisible }
onOk = { handleOk }
onCancel = { handleCancel } 
maskClosable={false}
okText="进入!"
style={{ top: '33%' }}
>

<Input
placeholder="输入考试密码"
prefix={<Icon type="key" />}
onChange={onPwdChange}
/>

{(isPwdError&&isConfirmed)&&
    <p className={styles.pwdError}>密码错误</p>
}


</Modal>

</div>

}

{(cardData.isFinished)&&
   <div className = { styles.finished }>已交卷</div>
}
       


      




        </Card>
    )
}

function mapStateToProps(state) {
    const modalVisible = state.exam.modalVisible;
    const examName=state.exam.examName;
    const isPwdError = state.exam.isPwdError;
    const isConfirmed=state.exam.isConfirmed;
   
    return {
        modalVisible,
        examName,
        isPwdError,
        isConfirmed

    }
}

export default connect(mapStateToProps)(ExamCard)