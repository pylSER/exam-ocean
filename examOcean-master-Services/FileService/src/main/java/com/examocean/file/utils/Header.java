package com.examocean.file.utils;

public enum Header {

    QUESTION("Id;QuestionContent;Answer1;IsTrue;Answer2;IsTrue;Answer3;IsTrue;Answer4;IsTrue;Answer5;IsTrue;Answer6;IsTrue;Answer7;IsTrue;Answer8;IsTrue;"),
    NAMELIST("Id;StuId;Name;Mail;"),
    SCORES("Id;StuId;Name;Score;Email");


    private String schema;

    private Header(String schema){
        this.schema = schema;

    }

    public String getSchema(){
        return schema;
    }

    public int getSize(){
        String text = getSchema();
        return text.split(";").length;
    }
}
