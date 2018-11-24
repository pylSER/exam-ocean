package com.examocean.paper.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by PandaLin on 2017/11/15.
 */

@Entity
@Table(name="answer")
public class Answer implements Serializable{
    public static final long serialVersionUID =10;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String content;

    @Column(nullable= false)
    private Boolean correct;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Question question;



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

    public Boolean getCorrect() {
        return correct;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }
}
