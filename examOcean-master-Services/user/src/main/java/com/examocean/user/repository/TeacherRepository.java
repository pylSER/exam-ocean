package com.examocean.user.repository;

import com.examocean.user.entity.Teacher;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Created by Rex Huang on 2017/11/18.
 */

@Repository
public interface TeacherRepository extends CrudRepository<Teacher, Integer>{
    List<Teacher> findByUsername (String username);

}
