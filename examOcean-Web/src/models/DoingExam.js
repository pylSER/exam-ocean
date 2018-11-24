// import * as examService from '../services/examPWDService';
import { routerRedux } from 'dva/router';


export default {

    namespace: 'doingExam',

    state: {
        examID: 0
    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line

            return history.listen(({ pathname, search }) => {
                if (pathname === '/doingExam') {
                    let id=localStorage.getItem("doingExamID");
                    dispatch({
                        type: 'doingExam/save',
                        payload: {
                            examID: id
                        }
                    })
                }
            });
        }

    },

    effects: {
        * checkExamPWD({ payload }, { call, put }) { // eslint-disable-line

            try {
                //TODO
            } catch (e) {
                yield put({
                    type: 'save',
                    payload: {
                        isConfirmed: true,
                        isPwdError: true
                    },
                });
            }

        },
    },

    reducers: {
        save(state, action) {
            return {...state, ...action.payload };
        },
    },

};