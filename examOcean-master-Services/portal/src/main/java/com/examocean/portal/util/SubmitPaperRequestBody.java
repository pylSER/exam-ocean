package com.examocean.portal.util;

public class SubmitPaperRequestBody {
    private int examID;

    public SubmitPaperRequestBody(){}

    public SubmitPaperRequestBody(int examID){
        this.examID=examID;
    }

    public int getExamID() {
        return examID;
    }

    public void setExamID(int examID) {
        this.examID = examID;
    }
}
