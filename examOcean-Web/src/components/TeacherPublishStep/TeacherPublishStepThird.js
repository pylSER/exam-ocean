import React from 'react'
import { connect } from 'dva'
import styles from './TeacherPublishStepThird.css'

import { Input, Icon,Table,Button } from 'antd'


function TeacherPublishStepThird ({dispatch, location,studentList}) {

  const columns = [{
    title: '学号',
    dataIndex: 'studentID',
  }, {
    title: '姓名',
    dataIndex: 'name',
  }, {
    title: 'Email',
    dataIndex: 'email',
  }];


  //STUB DATA

  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key:i,
      studentID: i,
      name: `Edward King ${i}`,
      email: `London, Park Lane no. ${i}`,
    });
  }


  function onSelectChange(selectedRowKeys){
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    dispatch({ type: 'publishExam/updateStudent',payload:selectedRowKeys })
  }

  function selectAll(){
    let allStudent=[];
    for (let {key} of data) {
      allStudent.push(key);
  }
    onSelectChange(allStudent);
  }

  return (
   <div>

          <div className={styles.role}>
            14级大一班
          </div>


      <div className={styles.row1}>
          <Button
            onClick={selectAll}
          >
            班级全选
          </Button>

       
          </div>
     
     <div>
     <Table rowSelection={
       {
        studentList,
        onChange: onSelectChange,
      }
      } 
      columns={columns} 
      dataSource={data} 
      />
      </div>
   
   

        <Button size="large" type="primary" style={{marginLeft:15, display:"block",float:"right"}}>
            生成考试
          </Button>
    

    <div className={styles.bottomRow} >
           <div> {studentList ? `已选择 ${studentList.length} 人` : ''} </div>         
    </div>

   </div>
  )
}

TeacherPublishStepThird.propTypes = {
}

function mapStateToProps (state) {
  let studentList=state.publishExam.studentList;
  return {
    studentList:studentList
  }
}

export default connect(mapStateToProps)(TeacherPublishStepThird)
