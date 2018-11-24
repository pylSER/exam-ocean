package com.examocean.portal.repository;

import com.examocean.portal.entity.Choice;
import com.examocean.portal.entity.PaperContent;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Rex Huang on 2017/12/07.
 */
@Repository
public interface ChoiceRepository extends CrudRepository<Choice,Integer>{
    List<Choice> findByPaperContent(PaperContent paperContent);
}
