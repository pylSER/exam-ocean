package com.examocean.file.domain;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="paper")
public class Paper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private double score;

    private Boolean calculated;

    private Boolean participated;

    private Boolean submitted;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Student student;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Exam exam;

    public Paper() {
        this.calculated = false;
        this.participated = false;
        this.submitted = false;
    }

    public Paper(Student student, Exam exam) {
        this.score = 0;
        this.student = student;
        this.exam = exam;
        this.calculated = false;
        this.participated = false;
        this.submitted = false;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public Boolean getCalculated() {
        return calculated;
    }

    public void setCalculated(Boolean calculated) {
        this.calculated = calculated;
    }

    public Boolean getParticipated() {
        return participated;
    }

    public void setParticipated(Boolean participated) {
        this.participated = participated;
    }

    public Boolean getSubmitted() {
        return submitted;
    }

    public void setSubmitted(Boolean submitted) {
        this.submitted = submitted;
    }
}
