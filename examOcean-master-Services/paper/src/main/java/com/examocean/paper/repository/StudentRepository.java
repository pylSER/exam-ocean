package com.examocean.paper.repository;

import com.examocean.paper.entity.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student, Long> {
    Student findById(int id);
}
