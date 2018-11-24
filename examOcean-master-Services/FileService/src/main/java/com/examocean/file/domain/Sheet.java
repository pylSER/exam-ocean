package com.examocean.file.domain;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="sheet")
public class Sheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String description;

    @ManyToMany(targetEntity = Student.class)
    private Set<Student> student;

    public Sheet() {
    }

    public Sheet(String name, String description, Set<Student> student) {
        this.name = name;
        this.description = description;
        this.student = student;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @JoinTable(name = "sheet_student",
        joinColumns = {@JoinColumn(name="sheet_id")},
        inverseJoinColumns = {@JoinColumn(name = "student_id")})

    public Set<Student> getStudent() {
        return student;
    }

    public void setStudent(Set<Student> student) {
        this.student = student;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
