import * as regService from '../services/registerService';
import { routerRedux } from 'dva/router';


export default {

    namespace: 'teacherRegister',

    state: {
        isRegisterSuccess: false,
        isRegisterDuplicate: false,
        isConnectionBad: false
    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
            return history.listen(({ pathname, search }) => {
                if (pathname === '/register/teacher') {
                    dispatch({
                        type: 'teacherRegister/save',
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
        * registerTeacher({ payload }, { call, put }) { // eslint-disable-line
            let reqBody = {
                username: payload.username,
                password: payload.password
            }

            let isRegisterSuccess = false;
            let isRegisterDuplicate = false;
            let isConnectionBad = false;


            try {
                let registerTeacherService=regService.getRegisterService("registerTeacher");
                let response = yield call(registerTeacherService, reqBody);
                
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