package com.examocean.user.entity;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by PandaLin on 2017/11/15.
 */

@Entity
@Table(name="question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String content;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Course course;

    @OneToMany(mappedBy = "question",cascade = {CascadeType.ALL})
    private Set<Answer> answers;

    public Question() {
    }

    public Question(String content, Course course) {
        this.content = content;
        this.course = course;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Set<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<Answer> answers) {
        this.answers = answers;
    }
}
