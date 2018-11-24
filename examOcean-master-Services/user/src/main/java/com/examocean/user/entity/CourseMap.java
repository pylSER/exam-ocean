package com.examocean.user.entity;

import javax.persistence.*;

@Entity
@Table(name="coursemap")
public class CourseMap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Teacher teacher;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Course course;

    public CourseMap() {
    }

    public CourseMap(Teacher teacher, Course course) {
        this.teacher = teacher;
        this.course = course;
    }

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
