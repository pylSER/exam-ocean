package com.examocean.paper.repository;

import com.examocean.paper.entity.Exam;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ExamRepository extends CrudRepository<Exam, Long> {
    List<Exam> findByCourseMap_Id(int courseMap_id);
    List<Exam> findBySheet_Id(int sheet_id);
}
