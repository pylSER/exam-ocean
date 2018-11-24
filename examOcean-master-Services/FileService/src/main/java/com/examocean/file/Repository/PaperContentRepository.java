package com.examocean.file.Repository;

import com.examocean.file.domain.PaperContent;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PaperContentRepository extends PagingAndSortingRepository<PaperContent,Integer> {
    public Iterable<PaperContent> findAllByPaperId(int paperId);

    public int countAllByPaperId(int paperId);

    @Modifying
    @Query("update PaperContent pc set pc.score = :score where pc.id = :id")
    @Transactional
    public void setScore(@Param(value = "score")double score, @Param(value = "id") int id);
}
