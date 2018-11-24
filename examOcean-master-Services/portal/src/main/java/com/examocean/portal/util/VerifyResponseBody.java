package com.examocean.portal.util;
/**
 * Created by Rex Huang on 2017/12/07.
 */
public class VerifyResponseBody {

    private boolean isRight;

    public VerifyResponseBody(){}

    public VerifyResponseBody(boolean isRight){
        this.isRight=isRight;
    }

//    @JSONField(name=”SOMETHING”)
    public boolean isisRight() {
        return isRight;
    }
//    @JSONField(name=”SOMETHING”)
    public void setisRight(boolean isRight) {
        this.isRight = isRight;
    }
}
