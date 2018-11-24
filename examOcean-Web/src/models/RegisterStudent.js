import * as regService from '../services/registerService';
import { routerRedux } from 'dva/router';


export default {

    namespace: 'studentRegister',

    state: {
        isRegisterSuccess: false,
        isRegisterDuplicate: false,
        isConnectionBad: false
    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
            return history.listen(({ pathname, search }) => {
                if (pathname === '/register/student') {
                    dispatch({
                        type: 'studentRegister/save',
                        payload: {
                            isRegisterSuccess: false,
                            isRegisterDuplicate: false,
                            isConnectionBad: false
                        }
                    })
                }
            })
        }

    },

    effects: {
        * registerStudent({ payload }, { call, put }) { // eslint-disable-line

            let reqBody = {
                username: payload.username,
                password: payload.password,
                number:payload.studentID,
                email:payload.email
            }

            let isRegisterSuccess = false;
            let isRegisterDuplicate = false;
            let isConnectionBad = false;


            try {
                let registerStudentService=regService.getRegisterService("registerStudent");
                let response = yield call(registerStudentService, reqBody);
                
                if (response.result == "signup success") {
                    isRegisterSuccess = true;
                    isRegisterDuplicate = false;
                    isConnectionBad = false;
                } else if (response.result == "name has been taken") {
                    isRegisterSuccess = false;
                    isRegisterDuplicate = true;
                    isConnectionBad = false;
                }

            } catch (e) {
                isRegisterSuccess = false;
                isRegisterDuplicate = false;
                isConnectionBad = true;
            }
            yield put({
                type: 'save',
                payload: {
                    isRegisterSuccess: isRegisterSuccess,
                    isRegisterDuplicate: isRegisterDuplicate,
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