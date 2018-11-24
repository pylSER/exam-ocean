package com.examocean.paper.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="choice")
public class Choice implements Serializable{
    public static final long serialVersionUID =12;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = {CascadeType.REFRESH})
    @JoinColumn
    private PaperContent paperContent;

    @ManyToOne(cascade = {CascadeType.REFRESH})
    @JoinColumn
    private AnswerOrder answerOrder;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public PaperContent getPaperContent() {
        return paperContent;
    }

    public void setPaperContent(PaperContent paperContent) {
        this.paperContent = paperContent;
    }

    public AnswerOrder getAnswerOrder() {
        return answerOrder;
    }

    public void setAnswerOrder(AnswerOrder answerOrder) {
        this.answerOrder = answerOrder;
    }
}
