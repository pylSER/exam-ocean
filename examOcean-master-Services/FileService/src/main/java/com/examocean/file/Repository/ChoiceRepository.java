package com.examocean.file.Repository;

import com.examocean.file.domain.Choice;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ChoiceRepository extends PagingAndSortingRepository<Choice,Integer> {
    public int countAllByPaperContentId(int paperContentId);


    public Iterable<Choice> findAllByPaperContentId(int paperContentId);
}
