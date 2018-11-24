package com.examocean.file.controller;

import com.examocean.file.Repository.*;
import com.examocean.file.VO.*;
import com.examocean.file.domain.*;
import com.examocean.file.utils.ResponseMessage;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@RequestMapping("/paper")
public class PaperCheckController {

    private ExamRepository examRepository;
    private PaperRepository paperRepository;
    private StudentRepository studentRepository;
    private PaperContentRepository paperContentRepository;
    private ChoiceRepository choiceRepository;
    private AnswerOrderRepository answerOrderRepository;

    public PaperCheckController(ExamRepository examRepository, PaperRepository paperRepository, StudentRepository studentRepository, PaperContentRepository paperContentRepository, ChoiceRepository choiceRepository, AnswerOrderRepository answerOrderRepository) {
        this.examRepository = examRepository;
        this.paperRepository = paperRepository;
        this.studentRepository = studentRepository;
        this.paperContentRepository = paperContentRepository;
        this.choiceRepository = choiceRepository;
        this.answerOrderRepository = answerOrderRepository;
    }

    @PostMapping("/exam/getSpecificQuestion")
    public Map<String,Object> getSpecificQuestion(@RequestBody Map<String,String> requestBody){
        ResponseMessage msg;
        Map<String,Object> keyMap = new HashMap<>();

        String examID = requestBody.get("examID");
        String questionNo = requestBody.get("questionNo");
        String stuID = requestBody.get("stuID");

        Exam exam;
        try{
            exam = examRepository.findOne(Integer.parseInt(examID));
        }catch (Exception e){
            msg = new ResponseMessage(1,"Invalid examId");
            keyMap.put("msg",msg);
            return keyMap;
        }

        if(null == exam){
            msg = new ResponseMessage(1,"The exam which id is '"+examID+"' doesn't exist!");
            keyMap.put("msg",msg);
            return keyMap;
        }

        Student student;

        try{
            student = studentRepository.findOne(Integer.parseInt(stuID));
        }catch (Exception e){
            msg = new ResponseMessage(1,"Invalid studentId");
            keyMap.put("msg",msg);
            return keyMap;
        }

        if(null==student){
            msg = new ResponseMessage(1,"The student whose id is '"+stuID+"' doesn't exist!");
            keyMap.put("msg",msg);
            return keyMap;
        }

        Map<Integer,OneQuestion> questions = getQuestions(exam,student.getId());
        if(null==questions){
            msg = new ResponseMessage(1,"The Student whose number is "+student.getNumber()+" doesn't has a paper!");
            keyMap.put("msg",msg);
            return keyMap;
        }else{

            OneQuestion one = questions.get(Integer.parseInt(questionNo));
            if(null!=one){
                msg = new ResponseMessage(0,"This Question is accessed successfully!");
                keyMap.put("msg",msg);
                keyMap.put("question",one);
                return keyMap;
            }else{
                msg = new ResponseMessage(1,"The Question Number is wrong!");
                keyMap.put("msg",msg);
                return keyMap;
            }

        }







    }

    @PostMapping("/check/showPaper")
    public Map<String,Object> check(HttpServletRequest request,@RequestBody ExamAndStuList examStuList){

        //------------------------------------------------------------


        //-----------------------------------------------------------
        ResponseMessage msg;
        Map<String,Object> keyMap = new HashMap<>();

//        String username = RoleFilter.getRole(request, Role.TEACHER);
//        if(null==username){
//            msg = new ResponseMessage(1,"You are not authorized to use this service!");
//            keyMap.put("msg",msg);
//            return keyMap;
//        }

        ExamVO examVO = new ExamVO();

        String examName = examStuList.getExamID();
//        System.out.println("ExamName:"+examName);

        Exam exam;
        try{
            exam = examRepository.findOne(Integer.parseInt(examName));
        }catch (Exception e){
            msg = new ResponseMessage(1,"Invalid examId");
            keyMap.put("msg",msg);
            return keyMap;
        }

        if(null == exam){
            msg = new ResponseMessage(1,"The exam which id is '"+examName+"' doesn't exist!");
            keyMap.put("msg",msg);
            return keyMap;
        }




        examVO.setExamName(exam.getName());
        examVO.setSize(exam.getQuestionNumber());

        List<OnePaper> papers= new ArrayList<>();


        List<String> stus = examStuList.getStudentID();
        for(String s:stus){
            OnePaper onePaper = new OnePaper();
            Student student;

            try{
                student = studentRepository.findOne(Integer.parseInt(s));
            }catch (Exception e){
                msg = new ResponseMessage(1,"Invalid studentId");
                keyMap.put("msg",msg);
                return keyMap;
            }

            if(null==student){
                msg = new ResponseMessage(1,"The student whose id is '"+s+"' doesn't exist!");
                keyMap.put("msg",msg);
                return keyMap;
            }


            onePaper.setStuName(student.getUsername());
            onePaper.setStuNum(student.getNumber());

//            System.out.println(student.getUsername());
//            System.out.println("stuId"+student.getId());


            Map<Integer,OneQuestion> questions = getQuestions(exam,student.getId());
            if(null==questions){
                msg = new ResponseMessage(1,"The Student whose number is "+student.getNumber()+" doesn't has a paper!");
                keyMap.put("msg",msg);
                return keyMap;
            }else{

                List<OneQuestion> questionList = new ArrayList<>();
                double totalScore = 0;
                for(int i = 1;i<=questions.size();i++){
                    OneQuestion one = questions.get(i);
                    questionList.add(one);
                    totalScore+=one.getScoreGained();
                }
                onePaper.setQuestions(questionList);
                onePaper.setTotalScore(totalScore);
            }

            papers.add(onePaper);


        }

        if(papers.size()>0){
            msg =  new ResponseMessage(0, "The papers are checked successfully!");
            keyMap.put("msg",msg);
            List<Paper> paperList = new ArrayList<>();

            examVO.setPapers(papers);


            keyMap.put("exam",examVO);
            return keyMap;
        }else{
            msg = new ResponseMessage(1,"Please select some students!");
            keyMap.put("msg",msg);
            return keyMap;
        }


    }

    private Map<Integer,OneQuestion> getQuestions(Exam exam, int stuId){
        Map<Integer,OneQuestion> questions = new HashMap<>();

        Iterable<Paper> papers = paperRepository.findByStudentIdAndExamId(stuId,exam.getId());
        Iterator<Paper> paperIterator = papers.iterator();
        Paper paper = new Paper();
        if(paperIterator.hasNext()){
            paper = paperIterator.next();
        }else{
            return null;
        }

//        System.out.println("paperId:"+paper.getId());

        Iterable<PaperContent> paperContents = paperContentRepository.findAllByPaperId(paper.getId());
//        System.out.println("size:"+paperContentRepository.countAllByPaperId(paper.getId()));

        Iterator<PaperContent> paperContentIterator = paperContents.iterator();


        while(paperContentIterator.hasNext()){
            OneQuestion oneQuestion = new OneQuestion();

            PaperContent paperContent = paperContentIterator.next();
            Question question = paperContent.getQuestion();
//            System.out.println(question.getContent());

            oneQuestion.setQuestionBody(question.getContent());
            oneQuestion.setScoreGained(paperContent.getScore());
            oneQuestion.setScore(exam.getPoint());


            Set<Answer> answers = question.getAnswers();
            Iterator<Answer> answerIterator = answers.iterator();

            Map<Integer,String> answersMap = new HashMap<>();
            List<Integer> correctAnsw = new ArrayList<>();
            int optionNum = 0;
            while(answerIterator.hasNext()){
                Answer answer = answerIterator.next();
//                System.out.println(answer.getContent());

//                System.out.println("answerId:"+answer.getId()+"  questionId:"+question.getId()+" PaperContentId:"+paperContent.getId());
                Iterable<AnswerOrder> answerOrders = answerOrderRepository.findByAnswerIdAndQuestionIdAndPaperContentId(answer.getId(),question.getId(),paperContent.getId());
                Iterator<AnswerOrder> answerOrderIterator = answerOrders.iterator();
                AnswerOrder answerOrder;
                if(answerOrderIterator.hasNext()){
                    answerOrder = answerOrderIterator.next();
                    int order = answerOrder.getAnsworder();
                    answersMap.put(order,answer.getContent());
                    optionNum++;
                    if(answer.getCorrect()){
                        correctAnsw.add(order);
                    }

                }else{
                    return null;
                }

            }



            oneQuestion.setCorrectAnswer(correctAnsw);
            if(optionNum>0){
                List<String> answerList = new ArrayList<>();
                for(int i = 1;i<=answersMap.size();i++){
                    answerList.add(answersMap.get(i));
                }
                oneQuestion.setOptions(answerList);
                oneQuestion.setOptionNum(optionNum);
            }else{
                return null;
            }


            Iterable<Choice> choices = choiceRepository.findAllByPaperContentId(paperContent.getId());
            Iterator<Choice> choiceIterator = choices.iterator();

            List<Integer> choiceList = new ArrayList<>();

            while(choiceIterator.hasNext()){
                Choice choice = choiceIterator.next();
                AnswerOrder answerOrder = choice.getAnswerOrder();
                choiceList.add(answerOrder.getAnsworder());
            }



//            if(choicesList.size()>0){
            oneQuestion.setSelectedAnswer(choiceList);
//            }else{
//                oneQuestion.setChoices(new ArrayList<>());
//            }

            questions.put(paperContent.getNumber(),oneQuestion);




        }

        if(questions.size()>0){
            return questions;
        }else {
            return null;
        }
    }


}
