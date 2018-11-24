package com.examocean.paper.repository;

import com.examocean.paper.entity.Course;
import com.examocean.paper.entity.Question;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface QuestionRepository extends CrudRepository<Question,Long> {
    List<Question> findByCourse(Course course);
}
