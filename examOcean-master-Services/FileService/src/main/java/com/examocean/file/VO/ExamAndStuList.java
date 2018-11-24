package com.examocean.file.VO;

import java.util.List;

public class ExamAndStuList {
    private String examID;
    private List<String> studentID;

    public String getExamID() {
        return examID;
    }

    public void setExamID(String examID) {
        this.examID = examID;
    }

    public List<String> getStudentID() {
        return studentID;
    }

    public void setStudentID(List<String> studentID) {
        this.studentID = studentID;
    }
}
