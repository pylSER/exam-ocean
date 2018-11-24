package com.examocean.file.Repository;

import com.examocean.file.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CourseRepository extends PagingAndSortingRepository<Course,Integer> {
    public Iterable<Course> findByName(String name);
}
