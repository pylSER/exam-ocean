package com.examocean.paper.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="papercontent")
public class PaperContent implements Serializable{
    public static final long serialVersionUID =17;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int number;

    private double score;


    private boolean marked;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Paper paper;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Question question;

    public PaperContent() {
        this.score = -2;
        this.marked = false;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public Paper getPaper() {
        return paper;
    }

    public void setPaper(Paper paper) {
        this.paper = paper;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public boolean isMarked() {
        return marked;
    }

    public void setMarked(boolean marked) {
        this.marked = marked;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
