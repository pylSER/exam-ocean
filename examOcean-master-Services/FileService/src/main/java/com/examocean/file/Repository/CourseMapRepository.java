package com.examocean.file.Repository;

import com.examocean.file.domain.CourseMap;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Iterator;

public interface CourseMapRepository extends PagingAndSortingRepository<CourseMap,Integer> {

    public Iterable<CourseMap> findAllByTeacherId(int teacherId);
}
