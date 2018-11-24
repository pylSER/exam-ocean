package com.examocean.file.controller;

import com.examocean.file.Repository.*;
import com.examocean.file.VO.ExamAndStuList;
import com.examocean.file.VO.ScoreVO;
import com.examocean.file.domain.*;
import com.examocean.file.utils.ResponseMessage;
import com.examocean.file.utils.Role;
import com.examocean.file.utils.RoleFilter;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

@RestController
@RequestMapping("/paper/calculation")
public class PaperCalculationController {

    private ExamRepository examRepository;
    private PaperRepository paperRepository;
    private StudentRepository studentRepository;
    private PaperContentRepository paperContentRepository;
    private ChoiceRepository choiceRepository;
    private AnswerRepository answerRepository;


    public PaperCalculationController(ExamRepository examRepository, PaperRepository paperRepository, StudentRepository studentRepository, PaperContentRepository paperContentRepository, ChoiceRepository choiceRepository, AnswerRepository answerRepository) {
        this.examRepository = examRepository;
        this.paperRepository = paperRepository;
        this.studentRepository = studentRepository;
        this.paperContentRepository = paperContentRepository;
        this.choiceRepository = choiceRepository;
        this.answerRepository = answerRepository;
    }

    @PostMapping("/getExamStudentList")
    public Map<String,Object> calculateAll(HttpServletRequest request,@RequestBody Map<String, String> map) {

        ResponseMessage msg;
        Map<String,Object> keyMap = new HashMap<>();
        List<ScoreVO> scores = new ArrayList<>();

        String username = RoleFilter.getRole(request, Role.TEACHER);
        if(null==username){
            msg =  new ResponseMessage(1,"You are not authorized to use this service!");
            keyMap.put("msg",msg);
            return keyMap;
        }


//        String examName = map.get("examName");
//
//        Exam exam = (Exam)(getExam(examName).get("exam"));
        String examId = map.get("examID");
        Exam exam;
        try{

            exam = examRepository.findOne(Integer.parseInt(examId));
        }catch (Exception e){
            msg = new ResponseMessage(1,"Invalid ExamID!");
            keyMap.put("msg",msg);
            return keyMap;
        }

        if(null==exam){
            msg =  new ResponseMessage(1, "The exam ID is wrong! We can't find this exam!");
            keyMap.put("msg",msg);
            return  keyMap;
        }

        Sheet sheet = exam.getSheet();
        Set<Student> students = sheet.getStudent();

        Iterator<Student> studentIterator = students.iterator();
        while (studentIterator.hasNext()) {
            Student student = studentIterator.next();



            ScoreVO scoreVO = new ScoreVO();
            double score = 0;

            Paper paper = (Paper)getPaper(student.getId(),exam.getId()).get("paper");
            if(paper.getParticipated()){
                if(paper.getCalculated()){
                    score = paper.getScore();
                }else{
                    score = getScore(paper,exam.getPoint());
                    paperRepository.setScore(score,paper.getId());
                }
            }else{
                score = -1;

            }
            scoreVO.setScore(score);
            scoreVO.setStudent(student);

            scores.add(scoreVO);


        }


        msg =  new ResponseMessage(0, "Scores are calculated successfully!");
        keyMap.put("msg",msg);

        keyMap.put("studentList",scores);

        return keyMap;

    }

    @PostMapping("/participate")
    public ResponseMessage setParticipated(@RequestBody Map<String, String> map){

        ResponseMessage msg;

        String studentID = map.get("studentID");
        String examID = map.get("examID");
        if(null==studentID||null==examID||studentID.isEmpty()||examID.isEmpty()){
            msg = new ResponseMessage(1,"There are some parameters missed");
            return  msg;
        }else {
            Exam exam;
            Student student;

            exam = examRepository.findOne(Integer.parseInt(examID));
            student = studentRepository.findOne(Integer.parseInt(studentID));
            if(null == exam||null==student){
                return new ResponseMessage(1,"Wrong Parameters!");
            }
            try{
                paperRepository.setParticipated(Integer.parseInt(studentID),Integer.parseInt(examID));
            }catch(Exception e){
                return new ResponseMessage(0,"You fail to participate in this exam");
            }

            return new ResponseMessage(0,"You participate in this exam successfully!");
        }
    }



    @PostMapping("/single")
    public Map<String,Object> calculateSingle(@RequestBody Map<String, String> map){
        double score = 0;
        Map<String,Object> keyMap = new HashMap<>();
        ResponseMessage msg;

        String examId = map.get("examID");
        String studentId = map.get("studentID");
        Exam exam;
        try{

            exam = examRepository.findOne(Integer.parseInt(examId));
        }catch (Exception e){
            msg = new ResponseMessage(1,"Invalid ExamID!");
            keyMap.put("msg",msg);
            return keyMap;
        }

        if(null==exam){
            msg =  new ResponseMessage(1, "The exam ID is wrong! We can't find this exam!");
            keyMap.put("msg",msg);
            return  keyMap;
        }

        Map<String,Object> paperMap = getPaper(Integer.parseInt(studentId),Integer.parseInt(examId));
        Paper paper = (Paper)paperMap.get("paper");
        if(paper==null){
            keyMap.put("msg",(ResponseMessage)paperMap.get("msg"));
            return keyMap;
        }


        if(paper.getParticipated()){
            if(paper.getCalculated()){
                score = paper.getScore();
            }else{
                score = getScore(paper,exam.getPoint());
                paperRepository.setScore(score,paper.getId());
            }
        }else{
            score = -1;
            paperRepository.setScore(score,paper.getId());
        }

        msg =  new ResponseMessage(0, "The score is calculated successfully!");
        keyMap.put("msg",msg);


        keyMap.put("score",score);
        return keyMap;


    }



    private double getScore(Paper paper,double point){

        int paperid = paper.getId();
        Iterable<PaperContent> paperContents = paperContentRepository.findAllByPaperId(paperid);

        Iterator<PaperContent> paperContentIterator = paperContents.iterator();
        double score = 0;
        while(paperContentIterator.hasNext()){
            PaperContent paperContent = paperContentIterator.next();
            int paperContentId = paperContent.getId();
            int choiceNum = choiceRepository.countAllByPaperContentId(paperContentId);
            int answerNum = answerRepository.countAllByQuestionIdAndCorrect(paperContent.getQuestion().getId(),true);
            Boolean isTrue = true;
            if(choiceNum==answerNum){

                Iterable<Choice> choices = choiceRepository.findAllByPaperContentId(paperContentId);
                Iterator<Choice> choiceIterator = choices.iterator();
                if(choiceIterator.hasNext()){
                    while(choiceIterator.hasNext()){
                        Choice choice = choiceIterator.next();
                        AnswerOrder answerOrder = choice.getAnswerOrder();
                        Answer answer = answerOrder.getAnswer();
                        if(!answer.getCorrect()){
                            isTrue = false;
                            break;
                        }

                    }
                }else{
                    isTrue =false;
                }

            }else{
                isTrue = false;
            }
            if(isTrue){
                score+=point;
                paperContentRepository.setScore(point,paperContentId);
            }else{
            }
        }
        return score;

    }



    private Map<String,Object> getPaper(int studentId, int examId){
        ResponseMessage msg;
        Map<String,Object> keyMap = new HashMap<>();

        Iterable<Paper> papers = paperRepository.findByStudentIdAndExamId(studentId,examId);
        Iterator<Paper> paperIterator = papers.iterator();
        Paper paper;
        if (paperIterator.hasNext()) {
            paper = paperIterator.next();
            if (paperIterator.hasNext()) {
                msg =   new ResponseMessage(1, "Database Error! The student whose number is " + studentId
                        + " has two paper in Exam " + examId + "!");

                keyMap.put("msg",msg);
                return keyMap;

            }
        } else {
            msg =  new ResponseMessage(1, "Database Error! The student whose number is " + studentId
                    + " does't has a paper in Exam " + examId + "!");
            keyMap.put("msg",msg);
            return keyMap;

        }

        keyMap.put("paper",paper);
        return keyMap;

    }


}
