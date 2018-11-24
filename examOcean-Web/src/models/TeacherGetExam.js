import * as getExamService from '../services/getTeacherExamService';
import { routerRedux } from 'dva/router';



export default {

    namespace: 'teacherExam',

    state: {
        currentList: [],
        finishedList: [],
        unStartedList: [],
        isConnectionBad: false
    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
            return history.listen(({ pathname, search }) => {
                if (pathname === '/teacher') {
                    dispatch({ type: 'teacherExam/getCurrentTeacherExam', payload: {} })
                }
            })
        }

    },

    effects: {
        * getCurrentTeacherExam({ payload }, { call, put }) { // eslint-disable-line

            let isConnectionBad = false;
            let currentList = [];
    

            let getCurrentExamService = getExamService.getTeacherExamService("current");


            try {
                let currentResponse = yield call(getCurrentExamService, "");

                currentList = currentResponse;
    
                isConnectionBad = false;

            } catch (e) {
                currentList = [];
                isConnectionBad = true;
            }
            yield put({
                type: 'save',
                payload: {
                    currentList: currentList,
                    isConnectionBad: isConnectionBad
                },
            });
        },
        * getPastTeacherExam({ payload }, { call, put }) { // eslint-disable-line

            let isConnectionBad = false;
            let finishedList = [];
            let getPastExamService = getExamService.getTeacherExamService("past");


            try {
                let pastResponse = yield call(getPastExamService, "");

              
                finishedList = pastResponse;
                isConnectionBad = false;

            } catch (e) {
                finishedList = [];
                isConnectionBad = true;
            }
            yield put({
                type: 'save',
                payload: {
                    
                    finishedList: finishedList,
            
                    isConnectionBad: isConnectionBad
                },
            });
        },
        * getFutureTeacherExam({ payload }, { call, put }) { // eslint-disable-line

            let isConnectionBad = false;
    
            let unStartedList = [];

            let getFutureExamService = getExamService.getTeacherExamService("future");
         


            try {
                let futureResponse = yield call(getFutureExamService, "");
      
                unStartedList = futureResponse;
                isConnectionBad = false;

            } catch (e) {
         
                unStartedList = [];
                isConnectionBad = true;
            }
            yield put({
                type: 'save',
                payload: {
                
                    unStartedList: unStartedList,
                    isConnectionBad: isConnectionBad
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