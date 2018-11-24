package com.examocean.file.VO;


import java.util.List;
import java.util.Map;

public class OneQuestion {
    private String questionBody;
    private List<String> options;
    private List<Integer> selectedAnswer;
    private List<Integer> correctAnswer;
    private double score;
    private double scoreGained;
    private int optionNum;

    public String getQuestionBody() {
        return questionBody;
    }

    public void setQuestionBody(String questionBody) {
        this.questionBody = questionBody;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public List<Integer> getSelectedAnswer() {
        return selectedAnswer;
    }

    public void setSelectedAnswer(List<Integer> selectedAnswer) {
        this.selectedAnswer = selectedAnswer;
    }

    public List<Integer> getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(List<Integer> correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public double getScoreGained() {
        return scoreGained;
    }

    public void setScoreGained(double scoreGained) {
        this.scoreGained = scoreGained;
    }

    public int getOptionNum() {
        return optionNum;
    }

    public void setOptionNum(int optionNum) {
        this.optionNum = optionNum;
    }
}
