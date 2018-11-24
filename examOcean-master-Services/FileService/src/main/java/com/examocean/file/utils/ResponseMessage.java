package com.examocean.file.utils;

public class ResponseMessage {
    private int msgcode;
    private String msg;

    public ResponseMessage(int msgcode, String msg) {
        this.msgcode = msgcode;
        this.msg = msg;
    }

    public ResponseMessage() {
    }

    public int getMsgcode() {
        return msgcode;
    }

    public void setMsgcode(int msgcode) {
        this.msgcode = msgcode;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
