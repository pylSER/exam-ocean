import React from 'react'
import { connect } from 'dva';
import { Icon,Checkbox,Row,Col,Button } from 'antd'
import styles from './ExamContent.css'

function ExamContent({ dispatch, markData}) {
    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
      }
    return ( 
        <div className={styles.examContent}>
          <h1 className={styles.examTitle}>
              软件过程管理
          </h1>

          <h3 className={styles.examRemainingTime}>剩余时间: 02:43:21</h3>

          <div className={styles.examContentMain}>
          <a className={styles.add} ><Icon type="star-o" className={styles.star}/>   标记这道题</a>

        <div className={styles.examQuestion}>
                1.驾驶车辆行至道路急转弯处，应怎样做？
        </div>
       
        <div className={styles.examSelectAnswer}>
        <Checkbox.Group onChange={onChange}>
               <Checkbox value="A" className={styles.examOptions}>借对向车道行驶</Checkbox><br />
               <Checkbox value="B" className={styles.examOptions}>急剧制动低速通过</Checkbox><br />
               <Checkbox value="C" className={styles.examOptions}>靠弯道外侧行驶</Checkbox><br />
               <Checkbox value="D" className={styles.examOptions}>充分减速并靠右侧行驶</Checkbox>
        </Checkbox.Group>
        </div>


        <div className={styles.btngrp}>
            <Button size="large" style={{marginRight:20}}><Icon type="left" />上一题</Button>
            <Button type="primary" size="large">下一题<Icon type="right" /></Button>

        </div>









        </div>




        </div>
    )
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(ExamContent)