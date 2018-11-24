package com.examocean.file.Repository;


import com.examocean.file.domain.Sheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface SheetRepository extends PagingAndSortingRepository<Sheet,Integer> {
    public Iterable<Sheet> findByName(String name);
}
