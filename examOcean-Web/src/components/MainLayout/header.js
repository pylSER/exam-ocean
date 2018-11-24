import React from 'react';
import { Menu, Icon,Tooltip,notification } from 'antd';
import { Link } from 'dva/router';
import styles from './header.css';
import * as logoutService from '../../services/logoutService';
import { routerRedux } from 'dva/router';
import { connect } from 'dva'


function Header({ dispatch ,location }) {

  async function doLogout(){
    let response =await logoutService.logout();
    if(response.result=="logout"){
      dispatch(routerRedux.replace('/login'));
    }else{
      notification["error"]({
        message: '网络连接失败',
        description: '检查网络并重试',
        duration: 3,
      });
    }
  }




  return (

    <div>
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="light"
      className={styles.headerMenu}
    >

    <Menu.Item key="/logo" className={styles.headerLogo} disabled={true}>
      <Link to="/"><span style={{  color: '#108ee9'}} className={styles.headerText} >EXAM OCEAN</span></Link>
    </Menu.Item>

      <Menu.Item key="/exam" className={styles.headerItem}>
        <Link to="/exam"><Icon type="edit" />考试</Link>
      </Menu.Item>
      <Menu.Item key="/myexam" className={styles.headerItem}>
          <Link to="/myexam"><Icon type="user" />我的</Link>
      </Menu.Item>

      <Menu.Item key="/login" className={styles.headerLogout}>
        <Tooltip placement="bottom" title="退出">
          <div onClick={doLogout}><Icon type="logout" /></div>
          </Tooltip>
      </Menu.Item>
    </Menu>
  </div>
  );
}



function mapStateToProps(state) {
  return {
    
  };
}

export default connect(mapStateToProps)(Header);

