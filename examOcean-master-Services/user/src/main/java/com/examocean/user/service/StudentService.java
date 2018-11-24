package com.examocean.user.service;

import com.examocean.user.entity.Student;
import com.examocean.user.repository.StudentRepository;
import com.examocean.user.util.ResultJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepo;
    private Student student;
    //用户登陆逻辑
    public ResultJson login(Student student){
        List<Student> students =studentRepo.findByUsername(student.getUsername());
        System.out.println(student.getUsername());
        System.out.println(students.get(0).getUsername());
        if(students.isEmpty())
            return new ResultJson("student does not exist");
        else if(students.get(0).getPassword().equals(student.getPassword())){
            this.student=students.get(0);
            return new ResultJson("login success");
        }
        else
            return new ResultJson("wrong password");
    }

    //用户注册逻辑
    public ResultJson signup(Student student){
        if(studentRepo.findByUsername(student.getUsername()).isEmpty()){
            studentRepo.save(student);
            return new ResultJson("signup success");
        }else
            return new ResultJson("name has been taken");
    }

    public int getStudentID() {
        return student.getId();
    }
}
