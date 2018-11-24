package com.examocean.portal.repository;

import com.examocean.portal.entity.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
/**
 * Created by Rex Huang on 2017/12/07.
 */
@Repository
public interface StudentRepository extends CrudRepository<Student, Integer> {
    List<Student> findById(int id);
}
