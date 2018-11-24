import * as checkPaperService from '../services/checkPaperService';
import { routerRedux } from 'dva/router';


export default {

    namespace: 'checkPaper',

    state: {
        isConnectionBad:false,
        exam:{},
        isWrong:false,
        msg:{}
    },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, search }) => {
            if (pathname === '/paper/check/showPaper') {
                dispatch({ 
                    type: 'checkPaper/save', 
                    payload: {
                        isConnectionBad:false,
                        exam:{},
                        isWrong:false,
                        msg:{}
                    } 
                });
            }
        });
    }

  },

  effects: {
    *fetchPapers({ payload }, { call, put }) {  // eslint-disable-line

        let reqBody = {
            examID : payload.examID,
            studentID : payload.studentID
        }
        
        let isConnectionBad = false;
        let exam = {};
        let isWrong = false;
        let msg = {};

        try {
            let response = yield call(checkPaperService.getPapers(reqBody));
            
            msg = response.msg;
            

            if(msg.msgcode=1){
                isWrong = true;
            }else{
                exam = response.exam;
            }

            isConnectionBad = false;

        } catch (e) {
            exam = {};
            isWrong = false;
            msg = {};
            isConnectionBad = true;
        }
        yield put({
            type: 'save',
            payload: {
                isConnectionBad:isConnectionBad,
                exam:exam,
                isWrong:isWrong,
                msg:msg
            },
        });
        },
    },

    reducers: {
        save(state, action){
        return { ...state, ...action.payload };
        },
    },

    };
