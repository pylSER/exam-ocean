package com.examocean.file.VO;

import java.util.List;
import java.util.Map;

public class OnePaper {

    private String stuName;
    private String stuNum;
    private double totalScore;
    private List<OneQuestion> questions;



    public String getStuName() {
        return stuName;
    }

    public void setStuName(String stuName) {
        this.stuName = stuName;
    }

    public String getStuNum() {
        return stuNum;
    }

    public void setStuNum(String stuNum) {
        this.stuNum = stuNum;
    }

    public List<OneQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(List<OneQuestion> questions) {
        this.questions = questions;
    }

    public double getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(double totalScore) {
        this.totalScore = totalScore;
    }
}
