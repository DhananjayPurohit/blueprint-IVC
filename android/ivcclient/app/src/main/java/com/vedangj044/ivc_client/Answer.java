package com.vedangj044.ivc_client;

public class Answer {

    private String name;
    private String time;
    private Boolean isCorrect;

    public Answer(String name, String time, Boolean isCorrect) {
        this.name = name;
        this.time = time;
        this.isCorrect = isCorrect;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Boolean getCorrect() {
        return isCorrect;
    }

    public void setCorrect(Boolean correct) {
        isCorrect = correct;
    }
}
