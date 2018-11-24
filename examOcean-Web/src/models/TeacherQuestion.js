import * as getLibService from '../services/getTeacherQuestionLibService';
import { routerRedux } from 'dva/router';



export default {

    namespace: 'teacherQuestion',

    state: {
       questionCardList:[],
       isConnectionBad:false
    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
            return history.listen(({ pathname, search }) => {
                if (pathname === '/teacher/questionlib') {
                    
                    dispatch({ type: 'teacherQuestion/getTeacherQuestionLib',payload:{} })
                }
            })
        }

    },

    effects: {
        * getTeacherQuestionLib({ payload }, { call, put }) { // eslint-disable-line

            let isConnectionBad=false;
            let questionCardList=[];


            try {
                let response = yield call(getLibService.getTeacherQuestionLib, "");

                questionCardList=response;
                isConnectionBad=false;
                
            } catch (e) {
                questionCardList=[];
                isConnectionBad=true;
            }
            yield put({
                type: 'save',
                payload: {
                    questionCardList:questionCardList,
                    isConnectionBad:isConnectionBad
                },
            });
        },
    },

    reducers: {
        save(state, action) {
            return {...state, ...action.payload };
        },

    },

};