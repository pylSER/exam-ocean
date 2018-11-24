package com.examocean.portal.entity;

import javax.persistence.*;

@Entity
@Table(name = "answerorder")
public class AnswerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int answorder;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Question question;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Answer answer;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private PaperContent paperContent;

    public AnswerOrder() {
    }

    public AnswerOrder(int answorder, Question question, Answer answer) {
        this.answorder = answorder;
        this.question = question;
        this.answer = answer;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAnsworder() {
        return answorder;
    }

    public void setAnsworder(int answorder) {
        this.answorder = answorder;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Answer getAnswer() {
        return answer;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }

    public PaperContent getPaperContent() {
        return paperContent;
    }

    public void setPaperContent(PaperContent paperContent) {
        this.paperContent = paperContent;
    }
}
