import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './DoingExamPage.css';
import { Icon,Layout} from 'antd';
import MainLayout from '../components/MainLayout/layout'

import MenuBlock from '../components/ExamMenu/MenuBlock';

import ExamContent from '../components/ExamContent/ExamContent';

const { Header, Content, Sider } = Layout;



function DoingExam(dispatch, location) {

function renderBlocks(){
  const MenuBlockListUI=[];
  
    let i=0;
    let markedData={};
  
    for(i=1;i<51;i+=1){
  
      if(i==1){
        markedData={
          markID:i,
          isCurrent:true,
          isMarked:false
        }
      }else if(i==10||i==49||i==34){
        markedData={
          markID:i,
          isCurrent:false,
          isMarked:true
        }
      }else{
        markedData={
          markID:i,
          isCurrent:false,
          isMarked:false
        }
      }
     
  
      MenuBlockListUI.push( <MenuBlock markData={markedData}/>);
    }


    return MenuBlockListUI;
}



  return (

      <MainLayout location={location}>
        
    <Layout style={{ height: '100%' }}>
      <Sider width={280} className={styles.sider}>
        <div className={styles.blockArea}>

            {renderBlocks()}

        
        </div>
   
      </Sider>


      <Layout >
        <Content className={styles.content}>
          <ExamContent />
        </Content>
      </Layout>

    </Layout>
     

      </MainLayout>
  
 


  );
}

DoingExam.propTypes = {
};


function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(DoingExam);
