package com.examocean.file.controller;

import com.examocean.file.Repository.*;
import com.examocean.file.domain.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@RestController
@RequestMapping("/test")
public class TestController {

    private ExamRepository examRepository;
    private PaperRepository paperRepository;
    private StudentRepository studentRepository;
    private SheetRepository sheetRepository;
    private TeacherRepository teacherRepository;
    private CourseRepository courseRepository;
    private CourseMapRepository courseMapRepository;
    private PaperContentRepository paperContentRepository;
    private ChoiceRepository choiceRepository;
    private AnswerRepository answerRepository;
    private AnswerOrderRepository answerOrderRepository;
    private QuestionRepository questionRepository;

    public TestController(ExamRepository examRepository, PaperRepository paperRepository, StudentRepository studentRepository, SheetRepository sheetRepository, TeacherRepository teacherRepository, CourseRepository courseRepository, CourseMapRepository courseMapRepository, PaperContentRepository paperContentRepository, ChoiceRepository choiceRepository, AnswerRepository answerRepository, AnswerOrderRepository answerOrderRepository, QuestionRepository questionRepository) {
        this.examRepository = examRepository;
        this.paperRepository = paperRepository;
        this.studentRepository = studentRepository;
        this.sheetRepository = sheetRepository;
        this.teacherRepository = teacherRepository;
        this.courseRepository = courseRepository;
        this.courseMapRepository = courseMapRepository;
        this.paperContentRepository = paperContentRepository;
        this.choiceRepository = choiceRepository;
        this.answerRepository = answerRepository;
        this.answerOrderRepository = answerOrderRepository;
        this.questionRepository = questionRepository;
    }

    @GetMapping("/preparedata")
    public void prepare(){
        Student stu1 = new Student("plw", "141250097", "141250097@smail.nju.edu.cn", "123");
        Student stu2 = new Student("lhl", "141250080", "141250080@smail.nju.edu.cn", "123");
        Student stu3 = new Student("hks", "141250040", "141250040@smail.nju.edu.cn", "123");

        stu1 = studentRepository.save(stu1);
        stu2 = studentRepository.save(stu2);
        stu3 = studentRepository.save(stu3);


        Set<Student> teststudents = new HashSet<>();
        teststudents.add(stu1);
        teststudents.add(stu2);
        teststudents.add(stu3);


        Sheet testsheet = new Sheet("欢乐颂", "三个人", teststudents);
        testsheet = sheetRepository.save(testsheet);
        Teacher testteacher = new Teacher();
        testteacher.setPassword("123");
        testteacher.setUsername("rgp");
        testteacher = teacherRepository.save(testteacher);
        Course testcourse = new Course("PSP", "我想怎么搞就怎么搞");
        testcourse = courseRepository.save(testcourse);

        CourseMap testcourseMap = new CourseMap(testteacher, testcourse);
        testcourseMap = courseMapRepository.save(testcourseMap);
        Exam testexam = new Exam("软件过程管理", "2017-11-27 14:00", "2017-11-27 16:00", 10, 10.0, testsheet, testcourseMap);
        testexam = examRepository.save(testexam);
        Paper paper1 = new Paper(stu1, testexam);
        paper1.setParticipated(true);
        Paper paper2 = new Paper(stu2, testexam);
        paper2.setParticipated(true);
        Paper paper3 = new Paper(stu3, testexam);
        paper3.setParticipated(true);
        paper1 = paperRepository.save(paper1);
        paper2 = paperRepository.save(paper2);
        paper3 = paperRepository.save(paper3);

        for(int p = 1;p<=3;p++) {

            for (int i = 1; i <= 10; i++) {


                String content = "问题"+i;

                Iterable<Question> questions = questionRepository.findByContent(content);
                Iterator<Question> questionIterator = questions.iterator();
                Question question = new Question();
                if(questionIterator.hasNext()){
                    question = questionIterator.next();
//                    System.out.println(question.getContent());
                }else{
                    question.setContent(content);
                    question.setCourse(testcourse);
                    question = questionRepository.save(question);
//                    System.out.println("save");
                }



                PaperContent paperContent = new PaperContent();
                paperContent.setNumber(i);
                paperContent.setQuestion(question);
                paperContent.setMarked(false);

                switch (p){
                    case 1:paperContent.setPaper(paper1);break;
                    case 2:paperContent.setPaper(paper2);break;
                    case 3:paperContent.setPaper(paper3);break;
                    default:break;
                }

                paperContent = paperContentRepository.save(paperContent);

                for (int j = 1; j <= 4; j++) {
                    String answerContent = "问题" + i + "答案" + j;
                    Answer answer = new Answer();

                    Iterable<Answer> answers = answerRepository.findByContent(answerContent);
                    Iterator<Answer> answerIterator = answers.iterator();
                    if(answerIterator.hasNext()){
                        answer = answerIterator.next();
                    }else{
                        answer.setQuestion(question);
                        answer.setContent(answerContent);


                        if (j % 2 == 0) {
                            answer.setCorrect(true);
                        } else {
                            answer.setCorrect(false);
                        }
                        answer = answerRepository.save(answer);
                    }



                    AnswerOrder answerOrder = new AnswerOrder();

                    Iterable<AnswerOrder> answerOrders = answerOrderRepository.findByAnswerIdAndQuestionIdAndPaperContentId(answer.getId(),question.getId(),paperContent.getId());
                    Iterator<AnswerOrder> answerOrderIterator = answerOrders.iterator();
                    if(answerOrderIterator.hasNext()){
                        answerOrder = answerOrderIterator.next();
                    }else{
                        answerOrder.setAnswer(answer);
                        answerOrder.setAnsworder(j);
                        answerOrder.setPaperContent(paperContent);
                        answerOrder.setQuestion(question);
                        answerOrder = answerOrderRepository.save(answerOrder);
                    }


                    double a = Math.random();
                    if(a<=0.5){
                        Choice choice = new Choice();
                        choice.setAnswerOrder(answerOrder);
                        choice.setPaperContent(paperContent);
                        choice = choiceRepository.save(choice);
                    }

                }
            }
        }





    }

    @GetMapping("/setSession")
    public void setSession(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("user","rgp");
        session.setAttribute("role","teacher");
    }


}
