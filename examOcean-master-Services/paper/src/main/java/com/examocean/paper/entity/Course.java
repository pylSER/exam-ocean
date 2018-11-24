package com.examocean.paper.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by PandaLin on 2017/11/15.
 */

@Entity
@Table(name="course")
public class Course implements Serializable{
    public static final long serialVersionUID =13;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    private String description;




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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
