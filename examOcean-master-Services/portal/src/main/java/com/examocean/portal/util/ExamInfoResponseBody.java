package com.examocean.portal.util;
/**
 * Created by Rex Huang on 2017/12/07.
 */
public class ExamInfoResponseBody {
    private String examName;
    private int questionNum;
    private String startTime;
    private String endTime;
    private double totalScore;

    public ExamInfoResponseBody(){}

    public ExamInfoResponseBody(String examName, int questionNum, String startTime, String endTime, double totalScore){
        this.examName=examName;
        this.questionNum=questionNum;
        this.startTime=startTime;
        this.endTime=endTime;
        this.totalScore=totalScore;
    }

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public int getQuestionNum() {
        return questionNum;
    }

    public void setQuestionNum(int questionNum) {
        this.questionNum = questionNum;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public double getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(double totalScore) {
        this.totalScore = totalScore;
    }
}
