package com.examocean.file.Repository;

import com.examocean.file.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface StudentRepository extends PagingAndSortingRepository<Student,Integer> {
    public Iterable<Student> findByNumber(String number);
}
