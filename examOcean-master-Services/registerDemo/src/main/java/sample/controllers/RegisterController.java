package sample.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sample.domain.Person;
import sample.service.PersonRepository;

import java.util.Iterator;

/**
 * Created by PandaLin on 2017/11/12.
 */

@Controller
@RequestMapping("/register")
public class RegisterController {
    private final PersonRepository repository;
    @Autowired
    public RegisterController(PersonRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    @ResponseBody
    public String findAll(){
        Iterable<Person> iterable = repository.findAll();
        Iterator iterator = iterable.iterator();
        String s = "";
        while (iterator.hasNext()){
            Person person = (Person)iterator.next();
            s+=person.toString();
            s+="<br>";
        }
        return s;
    }

    @GetMapping("/findone")
    @ResponseBody
    public String findByName(@RequestParam(value="name",defaultValue = "",required = true)String name){
        return this.repository.findByName(name).toString();
    }

    @GetMapping("/add")
    @ResponseBody
    public String add(@RequestParam(value="name",defaultValue = "",required = true)String name){
        Person person = new Person();
        person.setName(name);
        return  repository.save(person).toString();

    }









}
