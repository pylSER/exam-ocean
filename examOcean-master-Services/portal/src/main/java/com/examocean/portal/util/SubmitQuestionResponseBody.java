package com.examocean.portal.util;
/**
 * Created by Rex Huang on 2017/12/07.
 */
public class SubmitQuestionResponseBody {
    private int errorCode;
    private String errorMsg;

    public SubmitQuestionResponseBody(){}

    public SubmitQuestionResponseBody(int errorCode, String errorMsg){
        this.errorCode=errorCode;
        this.errorMsg=errorMsg;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }
}
