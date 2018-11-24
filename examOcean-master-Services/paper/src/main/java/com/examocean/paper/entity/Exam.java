package com.examocean.paper.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="exam")
public class Exam implements Serializable{

    public static final long serialVersionUID =15;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String startDate;
    private String endDate;
    private int questionNumber;
    private Double point;

    private String keyCode;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Sheet sheet;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private CourseMap courseMap;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public int getQuestionNumber() {
        return questionNumber;
    }

    public void setQuestionNumber(int questionNumber) {
        this.questionNumber = questionNumber;
    }

    public Double getPoint() {
        return point;
    }

    public void setPoint(Double point) {
        this.point = point;
    }

    public Sheet getSheet() {
        return sheet;
    }

    public void setSheet(Sheet sheet) {
        this.sheet = sheet;
    }

    public CourseMap getCourseMap() {
        return courseMap;
    }

    public void setCourseMap(CourseMap courseMap) {
        this.courseMap = courseMap;
    }

    public String getKeyCode() {
        return keyCode;
    }

    public void setKeyCode(String keyCode) {
        this.keyCode = keyCode;
    }
}
