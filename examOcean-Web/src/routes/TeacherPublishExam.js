import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router';
import styles from './TeacherPublishExam.css'
import MainLayout from '../components/TeacherMainLayout/layout'
import { Icon,Steps, Button, message } from 'antd'
import FirstStep from '../components/TeacherPublishStep/TeacherPublishStepFirst'


const Step = Steps.Step;

function TeacherPublishExam ({dispatch, location}) {
    // const steps = [{
    //     title: '配置考试',
    //     key: 'first',
    //   }, {
    //     title: '选择题目',
    //     key: 'second',
    //   }, {
    //     title: '选择考生',
    //     key: 'third',
    //   }];


  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
      <div>
        
        <div className="steps-content">
            <FirstStep />
        </div>
      </div>


      </div>
    </MainLayout>
  )
}

TeacherPublishExam.propTypes = {
}

function mapStateToProps (state) {
  // let currentStep=state.publishExam.currentStep;
  return {
    // currentStep:currentStep
  }
}

export default connect(mapStateToProps)(TeacherPublishExam)
