
export default {

    namespace: 'publishExam',

    state: {
        // currentStep:0,
        // studentList:[]
    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
            return history.listen(({ pathname, search }) => {

                // if (pathname === '/teacher/publishExam' || pathname === '/teacher') {
                //     dispatch({ type: 'publishExam/clearAll',payload:{} })
                // }
               
            });
        }

    },

    effects: {
        // * fetchExamMsg({ payload }, { call, put }) { // eslint-disable-line
        //     let cardWord = '';

        //     try {
        //         let response = yield call(examService.fetchExamMsg, payload);
        //         cardWord = response.name;
        //     } catch (e) {
        //         cardWord = 'connection failed';
        //     }
        //     yield put({
        //         type: 'save',
        //         payload: {
        //             cardWord
        //         },
        //     });
        // },



    },

    reducers: {
        save(state, action) {
            return {...state, ...action.payload };
        },

        // updateStudent(state, action){
        //     return { ...state, studentList:action.payload };
        // },

        // clearAll(state, action){
        //     state.currentStep=0;
        //     state.studentList=[];
        //     return { ...state, ...action.payload };
        // },
        // goToNextStep(state, action){
        //     if(state.currentStep<3){ // four steps
        //         let step=state.currentStep+1;
        //         return {...state, currentStep:step};
        //     }else{
        //         return { ...state, ...action.payload };
        //     }
        // },
        // goToPrevStep(state, action){
        //     if(state.currentStep>0){
        //         let step=state.currentStep-1;
        //         return {...state, currentStep:step};
        //     }else{
        //         return { ...state, ...action.payload };
        //     }
        // },
    },

};