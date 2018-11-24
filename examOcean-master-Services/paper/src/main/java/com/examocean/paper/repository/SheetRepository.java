package com.examocean.paper.repository;

import com.examocean.paper.entity.Sheet;
import com.examocean.paper.entity.Student;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SheetRepository extends CrudRepository<Sheet,Long> {
    Sheet findById(int id);
    List<Sheet> findByStudent(Student student);
}
