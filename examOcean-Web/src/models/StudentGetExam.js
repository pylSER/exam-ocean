import * as getExamService from '../services/getStudentExamService';
import { routerRedux } from 'dva/router';



export default {

    namespace: 'studentExam',

    state: {
        currentList: [],
        finishedList: [],
        unStartedList: [],
        isConnectionBad: false
    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
            return history.listen(({ pathname, search }) => {
                if (pathname === '/exam') {
                    dispatch({ type: 'studentExam/getCurrentStudentExam', payload: {} })
                }
            })
        }

    },

    effects: {
        * getCurrentStudentExam({ payload }, { call, put }) { // eslint-disable-line

            let isConnectionBad = false;
            let currentList = [];
    

            let getCurrentExamService = getExamService.getStudentExamService("current");


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
        * getPastStudentExam({ payload }, { call, put }) { // eslint-disable-line

            let isConnectionBad = false;
            let finishedList = [];
            let getPastExamService = getExamService.getStudentExamService("past");


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
        * getFutureStudentExam({ payload }, { call, put }) { // eslint-disable-line

            let isConnectionBad = false;
    
            let unStartedList = [];

            let getFutureExamService = getExamService.getStudentExamService("future");
         


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