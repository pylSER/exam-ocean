package com.examocean.file.Repository;

import com.examocean.file.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface QuestionRepository extends PagingAndSortingRepository<Question,Integer> {

    public Iterable<Question> findByContent(String content);

    public int countAllByCourseId(int courseId);

}
