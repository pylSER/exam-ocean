import * as examService from '../services/examPWDService';
import { routerRedux } from 'dva/router';


export default {

    namespace: 'exam',

    state: {
        modalVisible: false,
        examName:"",
        isPwdError:false,
        isConfirmed:false,
    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
            return history.listen(({ pathname, search }) => {
                
            });
        }

    },

    effects: {
        * checkExamPWD({ payload }, { call, put }) { // eslint-disable-line

            try {
                let response = yield call(examService.checkExamPWD, payload);

                
                if(response.isisRight){
                    
                    yield put({
                        type: 'save',
                        payload: {
                            isConfirmed:false,
                            isPwdError:false,
                            modalVisible:false,
                        },
                    });
                    
                    localStorage.setItem("doingExamID",payload.examID);
                    yield put(routerRedux.replace({ pathname: '/doingExam',state:{examID:payload.examID} }));
                    return;
                }else{
                    yield put({
                        type: 'save',
                        payload: {
                            isConfirmed:true,
                            isPwdError:true
                        },
                    });
                }
            } catch (e) {
                console.log(e);
                yield put({
                    type: 'save',
                    payload: {
                        isConfirmed:true,
                        isPwdError:true
                    },
                });
            }
            
        },
    },

    reducers: {
        save(state, action) {
            return {...state, ...action.payload };
        },
        showEnterExamModal(state, action){
            return {...state, modalVisible:true,examName:action.payload};
        },
        closeEnterExamModal(state, action){
            return {...state, modalVisible:false,isConfirmed:false,isPwdError:false };
        },
    },

};