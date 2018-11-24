package com.examocean.paper.repository;

import com.examocean.paper.entity.Teacher;
import org.springframework.data.repository.CrudRepository;

public interface TeacherRepository extends CrudRepository<Teacher,Long> {
    Teacher findByUsername(String username);
}
