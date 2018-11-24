package com.examocean.portal.service;

import com.examocean.portal.entity.*;
import com.examocean.portal.repository.*;
import com.examocean.portal.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Rex Huang on 2017/12/05.
 */
@Service
public class PortalService {
    @Autowired
    private ExamRepository examRepo;
    @Autowired
    private StudentRepository studentRepo;
    @Autowired
    private PaperRepository paperRepo;
    @Autowired
    private PaperContentRepository paperContentRepo;
    @Autowired
    private AnswerOrderRepository answerOrderRepo;
    @Autowired
    private ChoiceRepository choiceRepo;
    //判断页面传入验证码与考试验证码是否匹配
    public VerifyResponseBody verify(VerifyRequestBody verifyRequestBody){
        List<Exam> exams=examRepo.findByIdAndKeyCode(verifyRequestBody.getExamID(),verifyRequestBody.getKey());
        if(exams.isEmpty())
            return new VerifyResponseBody(false);
        else
            return new VerifyResponseBody(true);
    }

    //根据examID获取考试信息
    public ExamInfoResponseBody getExamInfo(ExamInfoRequestBody examInfoRequestBody){
        List<Exam> exams=examRepo.findById(examInfoRequestBody.getExamID());
        if(exams.isEmpty())
            return new ExamInfoResponseBody();
        else {
            Exam exam=exams.get(0);
            return new ExamInfoResponseBody(exam.getName(),exam.getQuestionNumber(),exam.getStartDate(),exam.getEndDate(),exam.getPoint());
        }
    }

    //学生提交某道题的答案
    public SubmitQuestionResponseBody submitQuestion(SubmitQuestionRequestBody submitQuestionRequestBody, int studentID){
        int examID=submitQuestionRequestBody.getExamID();
        int questionNo=submitQuestionRequestBody.getQuestionNo();
        String[] selectedAnswers=submitQuestionRequestBody.getSelectedAnswer();
        Paper paper;
        PaperContent paperContent=new PaperContent();
        List<Exam> exams=examRepo.findById(examID);
        List<Student> students=studentRepo.findById(studentID);
        if(exams.isEmpty())
            return new SubmitQuestionResponseBody(1,"exam not found");
        else if(students.isEmpty())
            return new SubmitQuestionResponseBody(1,"student not found");
        else{
            List<Paper> papers=paperRepo.findByExamAndStudent(exams.get(0),students.get(0));
            if(papers.isEmpty())
                return new SubmitQuestionResponseBody(1,"paper not found");
            else{
                paper=papers.get(0);
                List<PaperContent> paperContents=paperContentRepo.findByPaperAndNumber(paper,questionNo);
                if(paperContents.isEmpty())
                    return new SubmitQuestionResponseBody(1,"papercontent not found");
                else{
                    paperContent=paperContents.get(0);
                    List<AnswerOrder> answerOrders=answerOrderRepo.findByPaperContent(paperContent);
                    if(answerOrders.isEmpty())
                        return new SubmitQuestionResponseBody(1,"answer not found");
                    else{
                        List<Choice> choices=choiceRepo.findByPaperContent(paperContent);
                        for (int i=0;i<choices.size();i++){
                            choiceRepo.delete(choices.get(i));
                        }
                        for(int i=0;i<selectedAnswers.length;i++){
                            for(int j=0;j<answerOrders.size();j++){
                                if(this.getIntegerOrder(selectedAnswers[i])==answerOrders.get(j).getAnsworder()){
                                    choiceRepo.save(new Choice(paperContent,answerOrders.get(j)));
                                    break;
                                }
                            }
                        }
                        return new SubmitQuestionResponseBody(0,"");
                    }

                }
            }
        }
    }

    //考生确认提交试卷
    public SubmitPaperResponseBody submitPaper(SubmitPaperRequestBody submitPaperRequestBody, int studentID){
        int examID=submitPaperRequestBody.getExamID();
        List<Exam> exams=examRepo.findById(examID);
        List<Student> students=studentRepo.findById(studentID);
        if(exams.isEmpty())
            return new SubmitPaperResponseBody(1,"exam not found");
        else if(students.isEmpty())
            return new SubmitPaperResponseBody(1,"student not found");
        else {
            List<Paper> papers = paperRepo.findByExamAndStudent(exams.get(0), students.get(0));
            if (papers.isEmpty())
                return new SubmitPaperResponseBody(1, "paper not found");
            else {
                Paper paper = papers.get(0);
                paper.setSubmitted(true);
                paperRepo.save(paper);
                return new SubmitPaperResponseBody(0,"");
            }
        }
    }

    private int getIntegerOrder(String order){
        switch (order){
            case "A":
                return 1;
            case "B":
                return 2;
            case "C":
                return 3;
            case "D":
                return 4;
            case "E":
                return 5;
            case "F":
                return 6;
            case "G":
                return 7;
            case "H":
                return 8;
                default:
                    return -1;
        }

    }
}
