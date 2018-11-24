package com.examocean.paper.repository;

import com.examocean.paper.entity.Answer;
import com.examocean.paper.entity.Question;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AnswerRepository extends CrudRepository<Answer,Long> {
    List<Answer> findByQuestion(Question question);
}
