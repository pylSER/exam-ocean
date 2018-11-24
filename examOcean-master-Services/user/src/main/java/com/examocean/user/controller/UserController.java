package com.examocean.user.controller;

import com.examocean.user.util.ResultJson;
import com.examocean.user.entity.Student;
import com.examocean.user.entity.Teacher;
import com.examocean.user.service.StudentService;
import com.examocean.user.service.TeacherService;
import com.sun.org.apache.regexp.internal.RE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Created by Rex Huang on 2017/11/18.
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private TeacherService teacherService;
    @Autowired
    private StudentService studentService;

    @PostMapping(value = "/teacher/login")
    public ResultJson login(@RequestBody Teacher teacher, HttpServletResponse httpServletResponse){
        ResultJson result= teacherService.login(teacher);
        if(result.getResult().equals("login success")){
            Cookie userCookie=new Cookie("user",teacher.getUsername());
            userCookie.setPath("/");
            Cookie roleCookie=new Cookie("role","teacher");
            roleCookie.setPath("/");
            httpServletResponse.addCookie(userCookie);
            httpServletResponse.addCookie(roleCookie);
        }
        return result;
    }

    @PostMapping(value = "/student/login")
    public ResultJson login(@RequestBody Student student, HttpServletResponse httpServletResponse){
        ResultJson result= studentService.login(student);
        if(result.getResult().equals("login success")){
            Cookie userCookie=new Cookie("user",student.getUsername());
            userCookie.setPath("/");
            Cookie idCookie=new Cookie("studentID",String.valueOf(studentService.getStudentID()));
            idCookie.setPath("/");
            Cookie roleCookie=new Cookie("role","student");
            roleCookie.setPath("/");
            httpServletResponse.addCookie(userCookie);
            httpServletResponse.addCookie(idCookie);
            httpServletResponse.addCookie(roleCookie);
        }
        return result;
    }

    @PostMapping(value="/logout")
    public ResultJson logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse){
        Cookie[] allCookies=httpServletRequest.getCookies();
        if(allCookies!=null){
            for(int i=0;i<allCookies.length;i++){
                Cookie iCookie=allCookies[i];
                if(iCookie.getName().equals("user")||iCookie.getName().equals("role")||iCookie.getName().equals("studentID"))
                    iCookie.setMaxAge(0);
                    iCookie.setValue("");
                    iCookie.setPath("/");
                    httpServletResponse.addCookie(iCookie);
            }
        }
        return new ResultJson("logout");
    }

    @PostMapping(value="/teacher/signup")
    public ResultJson signup(@RequestBody Teacher teacher){
        ResultJson result= teacherService.signup(teacher);
        return result;
    }

    @PostMapping(value="/student/signup")
    public ResultJson signup(@RequestBody Student student){
        ResultJson result= studentService.signup(student);
        return result;
    }
}
