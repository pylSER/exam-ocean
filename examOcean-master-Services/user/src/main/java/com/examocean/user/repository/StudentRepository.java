package com.examocean.user.repository;

import com.examocean.user.entity.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Rex Huang on 2017/11/18.
 */
@Repository
public interface StudentRepository extends CrudRepository<Student,Integer>{
    List<Student> findByUsername (String username);
}
