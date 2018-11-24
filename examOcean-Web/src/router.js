import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import { Link } from 'dva/router';

function RouterConfig({ history, app }) {
    const MyExamPage = dynamic({
        app,
        models: () => [
            import ('./models/MyExam'),
        ],
        component: () =>
            import ('./routes/MyExam'),
    });


    const ExamPage = dynamic({
        app,
        models: () => [
            import ('./models/StudentGetExam'),
            import ('./models/exam')
        ],
        component: () =>
            import ('./routes/ExamPage'),
    });


    const LoginPage = dynamic({
        app,
        models: () => [
            import ('./models/login'),
        ],
        component: () =>
            import ('./routes/LoginPage'),
    });

    const RegisterPage = dynamic({
        app,
        // TODO  add model
        component: () =>
            import ('./routes/RegisterPage'),
    });


    const RegisterStudentPage = dynamic({
        app,
        models: () => [
            import ('./models/RegisterStudent'),
        ],
        component: () =>
            import ('./routes/RegisterStudentPage'),
    });

    const RegisterTeacherPage = dynamic({
        app,
        models: () => [
            import ('./models/RegisterTeacher'),
        ],
        component: () =>
            import ('./routes/RegisterTeacherPage'),
    });

    const TeacherExamPage = dynamic({
        app,
        models: () => [
            import ('./models/TeacherGetExam'),
        ],
        component: () =>
            import ('./routes/TeacherExamPage'),
    });


    const TeacherQuestionPage = dynamic({
        app,
        models: () => [
            import ('./models/TeacherQuestion'),
        ],
        component: () =>
            import ('./routes/TeacherQuestionPage'),
    });


    const TeacherStudentPage = dynamic({
        app,
        models: () => [
            import ('./models/TeacherClass'),
        ],
        component: () =>
            import ('./routes/TeacherStudentPage'),
    });

    const ImportQuestionLibPage = dynamic({
        app,
        models: () => [
            import ('./models/importQuestionLib'),
        ],
        component: () =>
            import ('./routes/ImportQuestion'),
    });

    const ImportStudentPage = dynamic({
        app,
        models: () => [
            import ('./models/importStudent'),
        ],
        component: () =>
            import ('./routes/ImportStudent'),
    });

    const TeacherPublishExamPage = dynamic({
        app,
        models: () => [
            import ('./models/TeacherPublishExam'),
        ],
        component: () =>
            import ('./routes/TeacherPublishExam'),
    });

    const DoingExamPage = dynamic({
        app,
        models: () => [
            import ('./models/DoingExam'),
        ],
        component: () =>
            import ('./routes/DoingExamPage'),
    });


    const TranscriptPage = dynamic({
        app,
        models: () => [
            import ('./models/Transcript'),
        ],
        component: () =>
            import ('./routes/TranscriptPage'),
    });

    const CheckPaperPage = dynamic({
        app,
        models: () => [
            import ('./models/CheckPaper'),
        ],
        component: () =>
            import ('./routes/CheckPaperPage'),
    });


    return ( 
    <Router history = { history } >
        <Switch >
        <Route exact path = "/" component = { LoginPage }/> 
        <Route exact path = "/login" component = { LoginPage }/> 
        <Route exact path = "/myexam" component = { MyExamPage }/> 
        <Route exact path = "/exam" component = { ExamPage }/>
        <Route exact path = "/register" component = { RegisterPage }/>
        <Route exact path = "/register/student" component = { RegisterStudentPage }/> 
        <Route exact path = "/register/teacher" component = { RegisterTeacherPage }/> 
        <Route exact path = "/teacher" component = { TeacherExamPage }/> 
        <Route exact path = "/teacher/questionlib" component = { TeacherQuestionPage }/> 
        <Route exact path = "/teacher/student" component = { TeacherStudentPage }/> 
        <Route exact path = "/teacher/questionlib/import" component = { ImportQuestionLibPage }/> 
        <Route exact path = "/teacher/student/import" component = { ImportStudentPage }/> 

        <Route exact path = "/teacher/publishExam" component = { TeacherPublishExamPage }/> 

        <Route exact path = "/doingExam" component = { DoingExamPage }/> 

        <Route exact path = "/transcript*" component = { TranscriptPage }/>
        
        <Route exact path = "/check" component = {CheckPaperPage}/>
        </Switch> 
    </Router>
    );
}

export default RouterConfig;