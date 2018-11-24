package com.examocean.paper.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="coursemap")
public class CourseMap implements Serializable{
    public static final long serialVersionUID =14;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Teacher teacher;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Course course;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
