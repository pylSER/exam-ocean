import React from 'react'
import { connect } from 'dva';
import { Icon } from 'antd'
import styles from './MenuBlock.css'

function MenuBlock({ dispatch, markData}) {

// markData={
//     markID:1,
//     isCurrent:true,
//     isMarked:true
// }

    let blockStyle=styles.block;
    if(markData.isCurrent){
        blockStyle+=" ";
        blockStyle+=styles.blockSelected;
    }



    return ( 
        <div className={blockStyle}>
            {markData.markID}

            {(markData.isMarked)&&
                <Icon type="star" className={styles.markStar}/>
            }
            
        </div>
    )
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(MenuBlock)