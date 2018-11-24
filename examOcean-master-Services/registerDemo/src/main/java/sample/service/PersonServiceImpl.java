package sample.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sample.domain.Person;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by PandaLin on 2017/11/12.
 */

@Component("personService")
@Transactional
public class PersonServiceImpl implements PersonService {

    @Autowired
    private final PersonRepository personRepository;

    public PersonServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }


    @Override
    public Person add(String name) {
        Person person = new Person();
        person.setName(name);
        return this.personRepository.save(person);
    }

    @Override
    public Iterable<Person> getPersons() {
        return this.personRepository.findAll();

    }

    @Override
    public Person findByName(String name) {
        return this.personRepository.findByName(name);
    }
}
