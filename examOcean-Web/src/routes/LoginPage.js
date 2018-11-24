import React from 'react';
import { connect } from 'dva';
import styles from './LoginPage.css';
import LoginFrame from '../components/Login/login';


function LoginPage() {
  return (
    <div className={styles.waveWrapper+" "+styles.waveAnimation}>
        <div className={styles.main_content}>
          <table>
            <tr></tr>
            <tr><LoginFrame /></tr>
            <tr></tr>
          </table>

        </div>
        <div className={styles.waveWrapperInner+" "+styles.bgTop}>
            <div className={styles.wave+' '+styles.waveTop}></div>
        </div>
        <div className={styles.waveWrapperInner+" "+styles.bgMiddle}>
            <div className={styles.wave+" "+styles.waveMiddle}></div>
        </div>
        <div className={styles.waveWrapperInner+" "+styles.bgBottom}>
            <div className={styles.wave+" "+styles.waveBottom}></div>
        </div>
    </div>


  );
}

LoginPage.propTypes = {
};


function mapStateToProps(state) {
}

export default connect()(LoginPage);
