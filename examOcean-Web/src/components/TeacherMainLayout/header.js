import React from 'react';
import { Menu, Icon,Tooltip } from 'antd';
import { Link } from 'dva/router';
import styles from './header.css';

function Header({ location }) {
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

      <Menu.Item key="/teacher" className={styles.headerItem}>
        <Link to="/teacher"><Icon type="edit" />考试</Link>
      </Menu.Item>
      <Menu.Item key="/teacher/questionlib" className={styles.headerItem}>
          <Link to="/teacher/questionlib"><Icon type="book" />题库</Link>
      </Menu.Item>
      <Menu.Item key="/teacher/student" className={styles.headerItem}>
          <Link to="/teacher/student"><Icon type="team" />学生</Link>
      </Menu.Item>

      <Menu.Item key="/login" className={styles.headerLogout}>
        <Tooltip placement="bottom" title="退出">
          <Link to="/login"><Icon type="logout" /></Link>
          </Tooltip>
      </Menu.Item>
    </Menu>
  </div>
  );
}

export default Header;
