package com.examocean.portal.util;
/**
 * Created by Rex Huang on 2017/12/07.
 */
public class VerifyRequestBody {
    private String key;
    private int examID;

    public VerifyRequestBody(){}

    public VerifyRequestBody(int examID, String key){
        this.examID=examID;
        this.key=key;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public int getExamID() {
        return examID;
    }

    public void setExamID(int examID) {
        this.examID = examID;
    }
}
