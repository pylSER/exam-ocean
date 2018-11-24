import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './RegisterPage.css';
import { Card,Icon } from 'antd';
import Header from '../components/MainLayout/headerReg';




function RegisterPage() {





  return (
    <div>
    <Header />

    <div className={styles.role}>
      选择用户类型
    </div>


    <div className={styles.typeRow}>
      <Link to="/register/student">
            <Card  className={styles.typeCard} style={{marginRight: 50}} >
              <Icon type="user" style={{ fontSize: 60, color: '#108ee9' }}  />
              <div className={styles.typeName} >学生</div>
            </Card>
      </Link>

      <Link to="/register/teacher">
            <Card  className={styles.typeCard} >
              <Icon type="solution" style={{ fontSize: 60, color: '#108ee9' }}  />
              <div className={styles.typeName} >教师</div>
            </Card>
      </Link>
    </div>


  </div>


  );
}

RegisterPage.propTypes = {
};


function mapStateToProps(state) {
}

export default connect()(RegisterPage);
