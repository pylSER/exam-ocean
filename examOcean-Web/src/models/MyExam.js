import * as myExamService from '../services/getMyExamService';


export default {

  namespace: 'myExam',

  state: {
    isConnectionBad:false,
    myExamList:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, search }) => {
              if (pathname === '/myexam') {
                dispatch({ type: 'fetchMyExam', payload: {} });
              }
            });
    }

  },

  effects: {
    *fetchMyExam({ payload }, { call, put }) {  // eslint-disable-line
      let isConnectionBad = false;
      let myExamList = [];

      try {
          let response = yield call(myExamService.getMyExam, "");
          myExamList = response;

          isConnectionBad = false;

      } catch (e) {
          myExamList = [];
          isConnectionBad = true;
      }
      yield put({
          type: 'save',
          payload: {
              myExamList: myExamList,
              isConnectionBad: isConnectionBad
          },
      });
    },
  },

  reducers: {
    save(state, action){
      return { ...state, ...action.payload };
    },
  },

};
