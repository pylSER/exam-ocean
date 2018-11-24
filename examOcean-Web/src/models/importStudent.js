import * as importService from '../services/importService';
import { routerRedux } from 'dva/router';


export default {

    namespace: 'ImportStudent',

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
                if (pathname === '/teacher/student/import') {
                    dispatch({
                        type: 'ImportStudent/save',
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
        * ImportStudent({ payload }, { call, put }) { // eslint-disable-line
    
            try {
                let ImportStudentService=importService.getImportService("importStudent");
                let response = yield call(ImportStudentService, payload);

                
                
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