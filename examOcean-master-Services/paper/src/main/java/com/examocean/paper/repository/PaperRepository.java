package com.examocean.paper.repository;

import com.examocean.paper.entity.Exam;
import com.examocean.paper.entity.Paper;
import com.examocean.paper.entity.Student;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PaperRepository extends CrudRepository<Paper,Long>{
    List<Paper> findByExam_Id(int exam_id);
    Paper findByExam_IdAndStudent_Id(int exam_id,int student_id);
    Paper findByExamAndStudent(Exam exam, Student student);
}
