import React from 'react';
import { Link } from 'dva/router';
import styles from './headerReg.css';

function Header() {
  return (
    
    <div>
    <div className={styles.nav} >
      <span className={styles.logo} style={{color: '#108ee9'}} ><Link to="/login">EXAM OCEAN</Link> 注册</span>
    </div>

    <hr />
    </div>
  );
}

export default Header;
