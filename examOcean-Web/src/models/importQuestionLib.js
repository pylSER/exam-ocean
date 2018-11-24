import * as importService from '../services/importService';
import { routerRedux } from 'dva/router';


export default {

    namespace: 'importQuestion',

    state: {
        fileList: [],
        isConnectionBad: false,
        isUploadSuccess:false,
        tipMsg:'',
        isUploadError:false
    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
            return history.listen(({ pathname, search }) => {
                if (pathname === '/teacher/questionlib/import') {
                    dispatch({
                        type: 'importQuestion/save',
                        payload: {
                            fileList: [],
                            isConnectionBad: false,
                            isUploadSuccess:false,
                            tipMsg:'',
                            isUploadError:false
                        }
                    })
                }
            })
        }

    },

    effects: {
        * importQuestion({ payload }, { call, put }) { // eslint-disable-line
    
            try {
                let importQuestionService=importService.getImportService("importQuestionLib");
                let response = yield call(importQuestionService, payload);

                if (response.msgcode == 0) {
                    yield put({
                        type: 'save',
                        payload: {
                            isUploadSucces: true,
                            isConnectionBad: false,
                            tipMsg:'',
                            isUploadError:false
                        },
                    });
                } else if (response.msgcode == 1) {
                    yield put({
                        type: 'save',
                        payload: {
                            isUploadSucces: false,
                            isConnectionBad: false,
                            tipMsg:response.msg,
                            isUploadError:true
                        },
                    });
                }

            } catch (e) {
                yield put({
                    type: 'save',
                    payload: {
                        isUploadSucces: false,
                        isConnectionBad: true,
                        tipMsg:'',
                        isUploadError:false
                    },
                });
            }

          
        },
    },

    reducers: {
        save(state, action) {
            return {...state, ...action.payload };
        },
        uploadFileList(state, action) {
            return {...state, fileList:action.payload };
        },


    },

};