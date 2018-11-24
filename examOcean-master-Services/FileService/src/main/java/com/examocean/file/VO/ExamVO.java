package com.examocean.file.VO;

import java.util.List;
import java.util.Map;

public class ExamVO {
    private String examName;
    private int size;
    private List<OnePaper> papers;

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public List<OnePaper> getPapers() {
        return papers;
    }

    public void setPapers(List<OnePaper> papers) {
        this.papers = papers;
    }
}
