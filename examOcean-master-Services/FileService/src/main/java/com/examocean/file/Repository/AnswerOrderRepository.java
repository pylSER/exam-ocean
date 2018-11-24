package com.examocean.file.Repository;

import com.examocean.file.domain.AnswerOrder;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AnswerOrderRepository extends PagingAndSortingRepository<AnswerOrder,Integer> {
    public Iterable<AnswerOrder> findByAnswerIdAndQuestionIdAndPaperContentId(int answerId,int questionId,int paperContentId);
}
