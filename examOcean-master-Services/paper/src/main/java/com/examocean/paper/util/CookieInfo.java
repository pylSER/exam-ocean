package com.examocean.paper.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class CookieInfo {
    //从cookie当中获取的教师信息只有user（name），学生信息只有studentID
    public static int getStudentID(HttpServletRequest httpServletRequest){
        int studentID=-100;
        Cookie[] cookies = httpServletRequest.getCookies();
        for (int i=0;i<cookies.length;i++){
            if (cookies[i].getName().equals("studentID")){
                studentID = Integer.parseInt(cookies[i].getValue());
            }
        }
        return studentID;
    }

    public static String getTeacherName(HttpServletRequest httpServletRequest){
        String teacherName = null;
        Cookie[] cookies = httpServletRequest.getCookies();
        for (int i=0;i<cookies.length;i++){
            if (cookies[i].getName().equals("user")){
                teacherName = cookies[i].getValue();
            }
        }
        return teacherName;
    }
}