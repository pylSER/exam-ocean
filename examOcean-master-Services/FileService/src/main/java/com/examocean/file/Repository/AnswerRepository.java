package com.examocean.file.Repository;

import com.examocean.file.domain.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.Repository;

public interface AnswerRepository extends PagingAndSortingRepository<Answer,Integer> {
    public int countAllByQuestionId(int questionId);

    public int countAllByQuestionIdAndCorrect(int questionId,Boolean correct);



    public Iterable<Answer> findByContent(String content);
}