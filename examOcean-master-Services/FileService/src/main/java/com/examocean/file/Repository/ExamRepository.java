package com.examocean.file.Repository;

import com.examocean.file.domain.Exam;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ExamRepository extends PagingAndSortingRepository<Exam,Integer> {
    public Iterable<Exam> findByName(String name);
}