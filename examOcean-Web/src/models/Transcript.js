import * as transcriptService from '../services/transcriptService';


export default {

    namespace: 'transcript',

    state: {
        isConnectionBad: false,
        transcriptList: [],
    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
            return history.listen(({ pathname, search }) => {
              
                if (pathname.indexOf('/transcript')==0) {
                    let examID=search.split("=")[1];
                    dispatch({ type: 'transcript/getTranscript', payload:examID });
                }
            });
        }

    },

    effects: {
        * getTranscript({ payload }, { call, put }) { // eslint-disable-line

              let isConnectionBad = false;
              let transcriptList = [];


              let reqBody={
                examID:payload
              }

              try {
                  let response = yield call(transcriptService.TranscriptService("studentScoreList"), reqBody);

                  transcriptList = response;

                  isConnectionBad = false;

              } catch (e) {
                  transcriptList = [];
                  isConnectionBad = true;
              }
              yield put({
                  type: 'save',
                  payload: {
                      transcriptList: transcriptList,
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