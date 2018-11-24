package com.examocean.portal.util;

public class SubmitPaperResponseBody {
    private int errorCode;
    private String errorMsg;

    public SubmitPaperResponseBody(){}

    public SubmitPaperResponseBody(int errorCode, String errorMsg){
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
