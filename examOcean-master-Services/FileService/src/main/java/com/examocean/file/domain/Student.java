package com.examocean.file.domain;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;

    private String number;

    private String email;

    private String password;

    @ManyToMany(mappedBy = "student")
    private Set<Sheet> sheet;


    public Student(String username, String number, String email, String password) {
        this.username = username;
        this.number = number;
        this.email = email;
        this.password = password;
    }

    public Student(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @ManyToMany(mappedBy = "student")
    public Set<Sheet> getSheet() {
        return sheet;
    }

    public void setSheet(Set<Sheet> sheet) {
        this.sheet = sheet;
    }



}
