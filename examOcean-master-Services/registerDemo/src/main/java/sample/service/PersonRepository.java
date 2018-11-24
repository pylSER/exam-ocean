package sample.service;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import sample.domain.Person;

import java.util.List;

/**
 * Created by PandaLin on 2017/11/12.
 */

@Repository
public interface PersonRepository extends JpaRepository<Person,Integer> {
    Person findByName(String name);

}
