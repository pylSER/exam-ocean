package com.examocean.file.Repository;

import com.examocean.file.domain.Teacher;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TeacherRepository extends PagingAndSortingRepository<Teacher,Integer> {
    public Teacher findByUsername(String username);
}
