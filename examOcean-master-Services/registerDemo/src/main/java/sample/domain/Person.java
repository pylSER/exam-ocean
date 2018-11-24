package sample.domain;


import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by PandaLin on 2017/11/12.
 */

@Entity
@Table(name="person")
public class Person implements Serializable{

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    public Person(){

    }

    public Person(String name){
        super();
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String toString(){
        return getId()+","+getName();
    }

}
