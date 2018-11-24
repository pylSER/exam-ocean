package com.examocean.paper.vo;

public class ReturnMessageVO {
    public int errorCode = 0;
    public String errorMsg= "";

    public ReturnMessageVO(Boolean bool) {
        if (!bool) {
            this.errorCode = 1;
            this.errorMsg = "something wrong ,can't add this exam";
        }
    }

}
