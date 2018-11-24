package com.examocean.portal.controller;

import com.examocean.portal.service.PortalService;
import com.examocean.portal.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by Rex Huang on 2017/12/05.
 */
@RestController
@RequestMapping("/portal")
public class PortalController {
    @Autowired
    private PortalService portalService;

    @PostMapping(value = "/isExamPwdRight")
    public VerifyResponseBody verify(@RequestBody VerifyRequestBody verifyRequestBody, HttpServletRequest httpServletRequest){
        Cookie[] allCookies=httpServletRequest.getCookies();
        if(allCookies==null){
            System.out.println("no cookies");
            return new VerifyResponseBody(false);
        }
        else{
            for(int i=0;i<allCookies.length;i++){
                Cookie iCookie=allCookies[i];
                if(iCookie.getName().equals("role")) {
                    System.out.println("authorized");
                    return portalService.verify(verifyRequestBody);
                }
            }
            System.out.println("no authorization");
            return new VerifyResponseBody(false);
        }
    }

    @PostMapping(value = "/getExamInfo")
    public ExamInfoResponseBody getExamInfo(@RequestBody ExamInfoRequestBody examInfoRequestBody, HttpServletRequest httpServletRequest){
        Cookie[] allCookies=httpServletRequest.getCookies();
        if(allCookies==null){
            System.out.println("no cookies");
            return new ExamInfoResponseBody();
        }else{
            for(int i=0;i<allCookies.length;i++){
                Cookie iCookie=allCookies[i];
                if(iCookie.getName().equals("role")){
                    System.out.println("authorized");
                    return portalService.getExamInfo(examInfoRequestBody);
                }
            }
            System.out.println("no authorization");
            return new ExamInfoResponseBody();
        }
    }

    @PostMapping(value = "/submitAnswer")
    public SubmitQuestionResponseBody submitAnswer(@RequestBody SubmitQuestionRequestBody submitQuestionRequestBody, HttpServletRequest httpServletRequest){
        int studentID=-1;
        Cookie[] allCookies=httpServletRequest.getCookies();
        for(int i=0;i<allCookies.length;i++){
            if(allCookies[i].getName().equals("studentID")){
                studentID= Integer.parseInt(allCookies[i].getValue());
                break;
            }
        }
        return portalService.submitQuestion(submitQuestionRequestBody,studentID);
    }

    @PostMapping(value = "/submitPaper")
    public SubmitPaperResponseBody submitPaper(@RequestBody SubmitPaperRequestBody submitPaperRequestBody, HttpServletRequest httpServletRequest){
        int studentID=-1;
        Cookie[] allCookies=httpServletRequest.getCookies();
        for(int i=0;i<allCookies.length;i++){
            if(allCookies[i].getName().equals("studentID")){
                studentID= Integer.parseInt(allCookies[i].getValue());
                break;
            }
        }
        return portalService.submitPaper(submitPaperRequestBody,studentID);
    }
}
