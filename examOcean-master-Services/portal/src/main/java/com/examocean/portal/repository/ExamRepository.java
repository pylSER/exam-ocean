package com.examocean.portal.repository;

import com.examocean.portal.entity.Exam;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Rex Huang on 2017/12/05.
 */
@Repository
public interface ExamRepository extends CrudRepository<Exam,Integer>{
    List<Exam> findById(int id);
    List<Exam> findByIdAndKeyCode (int id, String keycode);
}
