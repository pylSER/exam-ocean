import React from 'react'
import { connect } from 'dva'
import styles from './TeacherPublishStepSecond.css'

import { Input, Icon,Table,Button } from 'antd'


function TeacherPublishStepSecond ({dispatch, location}) {
  const columns = [{
    title: '题目',
    dataIndex: 'question',
  }, {
    title: '选项',
    dataIndex: 'items',
  }, {
    title: '答案',
    dataIndex: 'anwser',
  }];



  return (
   <div>Second</div>
  )
}

TeacherPublishStepSecond.propTypes = {
}

function mapStateToProps (state) {
  return {

  }
}

export default connect(mapStateToProps)(TeacherPublishStepSecond)
