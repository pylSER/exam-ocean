package com.examocean.paper.controller;

import com.examocean.paper.service.ExamService;
import com.examocean.paper.util.CookieInfo;
import com.examocean.paper.vo.ExamInfoStudentVO;
import com.examocean.paper.vo.ExamInfoTeacherVO;
import com.examocean.paper.vo.IniExamInfoVO;
import com.examocean.paper.vo.ReturnMessageVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/examService")
public class ExamController {
    @Autowired
    private ExamService examService;

    @GetMapping(value="/teacher/getExamNotStarted")
    public List<ExamInfoTeacherVO> getExamNotStartedForTeacher(HttpServletRequest httpServletRequest){
        String username = CookieInfo.getTeacherName(httpServletRequest);
        return examService.getExamNotStartedForTeacher(username);
    }

    @GetMapping(value="/teacher/getCurrentExam")
    public List<ExamInfoTeacherVO> getCurrentExamForTeacher(HttpServletRequest httpServletRequest){
        String username = CookieInfo.getTeacherName(httpServletRequest);
        return examService.getCurrentExamForTeacher(username);
    }


    @GetMapping(value="/teacher/getExamFinished")
    public List<ExamInfoTeacherVO> getExamFinishedForTeacher(HttpServletRequest httpServletRequest){
        String username = CookieInfo.getTeacherName(httpServletRequest);
        return examService.getExamFinishedForTeacher(username);
    }

    @GetMapping(value="/student/getExamNotStarted")
    public List<ExamInfoStudentVO> getExamNotStartedForStudent(HttpServletRequest httpServletRequest){
        int student_id = CookieInfo.getStudentID(httpServletRequest);
        //System.out.println("studentID: "+student_id);
        return examService.getExamNotStartedForStudent(student_id);
    }

    @GetMapping(value="/student/getCurrentExam")
    public List<ExamInfoStudentVO> getCurrentExamForStudent(HttpServletRequest httpServletRequest){
        int student_id = CookieInfo.getStudentID(httpServletRequest);
        return examService.getCurrentExamForStudent(student_id);
    }

    @GetMapping(value="/student/getExamFinished")
    public List<ExamInfoStudentVO> getExamFinishedForStudent(HttpServletRequest httpServletRequest){
        int student_id = CookieInfo.getStudentID(httpServletRequest);
        return examService.getExamFinishedForStudent(student_id);
    }


    @PostMapping(value="/add")
    public ReturnMessageVO add(HttpServletRequest httpServletRequest,@RequestBody IniExamInfoVO iniExamInfoVO) {
        String username = CookieInfo.getTeacherName(httpServletRequest);
        examService.generateExam(username,iniExamInfoVO);
        return new ReturnMessageVO(true);//按理说这里应该根据情况返回true或者false，
        // 这里简化逻辑了，后台不作判断，姑且认为都是对的仅依靠前台进行脏数据过滤和日期格式检测等
    }

    @GetMapping(value="/student/getExamRecord")
    public List<ExamInfoStudentVO> getExamRecordForStudent(HttpServletRequest httpServletRequest){
        int student_id = CookieInfo.getStudentID(httpServletRequest);
        //System.out.println(student_id);
        return examService.getExamRecordForStudent(student_id);
    }

}
