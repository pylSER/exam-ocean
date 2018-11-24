package com.examocean.file.Repository;

import com.examocean.file.domain.Paper;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PaperRepository extends PagingAndSortingRepository<Paper,Integer> {

    public Iterable<Paper> findByStudentIdAndExamId(int studentid, int examid);

    @Modifying
    @Query("update Paper p set p.score = :score , p.calculated = true where p.id = :id")
    @Transactional
    public void setScore(@Param(value = "score")double score,@Param(value = "id") int id);

    @Modifying
    @Query("update Paper p set p.participated = true where p.student.id = :stuid and p.exam.id = :examid")
    @Transactional
    public void setParticipated(@Param(value="stuid")int studentid,@Param(value="examid")int examid);
}
