package com.examocean.paper.vo;

public class ExamInfoStudentVO {
    private String examName;
    private int examID;
    private String startDate;//"YYYY-MM-DD HH:MM:SS"
    private String endDate;//"YYYY-MM-DD HH:MM:SS"
    private boolean examing;// 是否已经交卷

    private double score;
    private double totalScore;

    public ExamInfoStudentVO() {
    }

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public int getExamID() {
        return examID;
    }

    public void setExamID(int examID) {
        this.examID = examID;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public boolean isExaming() {
        return examing;
    }

    public void setExaming(boolean finished) {
        this.examing = finished;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public double getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(double totalScore) {
        this.totalScore = totalScore;
    }
}
