import * as getClassService from '../services/getTeacherClassService';
import { routerRedux } from 'dva/router';



export default {

    namespace: 'teacherClass',

    state: {
        classList:[],
       isConnectionBad:false
    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
            return history.listen(({ pathname, search }) => {
                if (pathname === '/teacher/student') {
                    
                    dispatch({ type: 'teacherClass/getTeacherClass',payload:{} })
                }
            })
        }

    },

    effects: {
        * getTeacherClass({ payload }, { call, put }) { // eslint-disable-line

            let isConnectionBad=false;
            let classList=[];


            try {
                let response = yield call(getClassService.getTeacherClass, "");

                classList=response;
                isConnectionBad=false;
                
            } catch (e) {
                classList=[];
                isConnectionBad=true;
            }
            yield put({
                type: 'save',
                payload: {
                    classList:classList,
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