package com.examocean.file.utils;

public enum Role {

    TEACHER("teacher"),STUDENT("student");

    private String role;
    private Role(String role){
        this.role = role;
    }

    public String getRole(){
        return this.role;
    }
}
