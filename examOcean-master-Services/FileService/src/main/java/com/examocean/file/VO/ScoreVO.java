package com.examocean.file.VO;

import com.examocean.file.domain.Student;

public class ScoreVO {
    private Student student;
    private double score;

    public ScoreVO() {
    }

    public ScoreVO(Student student, double score) {
        this.student = student;
        this.score = score;
    }

    public void setStudent(Student student) {
        this.student = student;
    }


    public void setScore(double score) {
        this.score = score;
    }

    public int getStudentID(){return student.getId();}

    public String getName(){
        return student.getUsername();
    }

    public String getNumber(){
        return student.getNumber();
    }

    public String getEmail(){
        return  student.getEmail();
    }

    public double getScore() {
        return score;
    }

}
