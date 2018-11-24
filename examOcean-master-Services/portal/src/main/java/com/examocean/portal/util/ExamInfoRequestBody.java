package com.examocean.portal.util;
/**
 * Created by Rex Huang on 2017/12/07.
 */
public class ExamInfoRequestBody {
    private int examID;

    public ExamInfoRequestBody(){}

    public ExamInfoRequestBody(int examID){
        this.examID=examID;
    }

    public int getExamID() {
        return examID;
    }

    public void setExamID(int examID) {
        this.examID = examID;
    }
}
