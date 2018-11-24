package com.examocean.portal.util;
/**
 * Created by Rex Huang on 2017/12/07.
 */
public class SubmitQuestionRequestBody {
    private int questionNo;
    private int examID;
    private String[] selectedAnswer;

    public SubmitQuestionRequestBody(){}

    public SubmitQuestionRequestBody(int questionNo, int examID, String[] selectedAnswer){
        this.questionNo=questionNo;
        this.examID=examID;
        this.selectedAnswer=selectedAnswer;
    }

    public int getQuestionNo() {
        return questionNo;
    }

    public void setQuestionNo(int questionNo) {
        this.questionNo = questionNo;
    }

    public int getExamID() {
        return examID;
    }

    public void setExamID(int examID) {
        this.examID = examID;
    }

    public String[] getSelectedAnswer() {
        return selectedAnswer;
    }

    public void setSelectedAnswer(String[] selectedAnswer) {
        this.selectedAnswer = selectedAnswer;
    }
}
