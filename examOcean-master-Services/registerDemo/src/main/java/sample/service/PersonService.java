package sample.service;

import sample.domain.Person;


/**
 * Created by PandaLin on 2017/11/12.
 */
public interface PersonService {
    Person add(String name);

    Iterable<Person> getPersons();

    Person findByName(String name);
}
