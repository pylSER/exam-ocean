package com.examocean.paper.repository;

import com.examocean.paper.entity.CourseMap;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseMapRepository extends CrudRepository<CourseMap,Long> {
    List<CourseMap> findByTeacher_Id(int teacher_id);
    CourseMap findByTeacher_IdAndCourse_Id(int teacher_id,int course_id);
}
