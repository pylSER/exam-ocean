package com.examocean.user.service;

import com.examocean.user.entity.Teacher;
import com.examocean.user.repository.TeacherRepository;
import com.examocean.user.util.ResultJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Rex Huang on 2017/11/18.
 */

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepo;

    //用户登陆逻辑
    public ResultJson login(Teacher teacher){
        List<Teacher> teachers =teacherRepo.findByUsername(teacher.getUsername());
        System.out.println(teacher.getUsername());
//      System.out.println(teachers.get(0).getUsername());
        if(teachers.isEmpty())
            return new ResultJson("teacher does not exist");
        else if(teachers.get(0).getPassword().equals(teacher.getPassword()))
            return new ResultJson("login success");
        else
            return new ResultJson("wrong password");
    }

    //用户注册逻辑
    public ResultJson signup(Teacher teacher){
        if(teacherRepo.findByUsername(teacher.getUsername()).isEmpty()){
            teacherRepo.save(teacher);
            return new ResultJson("signup success");
        }else
            return new ResultJson("name has been taken");
    }
}
