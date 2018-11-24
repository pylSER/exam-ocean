import * as loginService from '../services/loginService';
import { routerRedux } from 'dva/router';


export default {

    namespace: 'login',

    state: {
        isLoginNameWrong: false,
        isLoginPasswordWrong: false,
        isConnectionBad: false,
        selectedType:1
    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
            return history.listen(({ pathname, search }) => {
                if (pathname === '/' || pathname == "/login") {
                    dispatch({
                        type: 'login/save',
                        payload: {
                            isLoginNameWrong: false,
                            isLoginPasswordWrong: false,
                            isConnectionBad: false,
                            selectedType:1
                        }
                    })
                }
            })
        }

    },

    effects: {
        * doLogin({ payload }, { call, put }) { // eslint-disable-line
            console.log(payload);
            let reqBody = payload.values;

            let isLoginNameWrong = false;
            let isLoginPasswordWrong = false;
            let isConnectionBad = false;


            try {
                let response = {};
                if (payload.selectedType == 1) {
                    let loginStudentService = loginService.getLoginService("loginStudent");
                    response = yield call(loginStudentService, reqBody);
                } else if (payload.selectedType == 2) {
                    let loginTeacherService = loginService.getLoginService("loginTeacher");
                    response = yield call(loginTeacherService, reqBody);
                }

                if (response.result == "login success") {
                    if (payload.selectedType == 1) {
                      
                        yield put(routerRedux.replace({ pathname: '/exam' }));
                    } else if (payload.selectedType == 2) {
                        yield put(routerRedux.replace({ pathname: '/teacher' }));
                    }
                    return;
                } else if (response.result == "wrong password") {
                  isLoginNameWrong=false;
                  isLoginPasswordWrong=true;
                  isConnectionBad=false;
                } else if (response.result == "student does not exist") {
                  isLoginNameWrong=true;
                  isLoginPasswordWrong=false;
                  isConnectionBad=false;
                } else if (response.result == "teacher does not exist") {
                  isLoginNameWrong=true;
                  isLoginPasswordWrong=false;
                  isConnectionBad=false;
                }

            } catch (e) {
              isLoginNameWrong=false;
              isLoginPasswordWrong=false;
              isConnectionBad=true;
            }
            yield put({
                type: 'save',
                payload: {
                    isLoginNameWrong: isLoginNameWrong,
                    isLoginPasswordWrong: isLoginPasswordWrong,
                    isConnectionBad: isConnectionBad
                },
            });

        },
    },

    reducers: {
        save(state, action) {
            return {...state, ...action.payload };
        },
        updateType(state, action) {
            return {...state, selectedType:action.payload };
        }
    },

};