
package com.vedangj044.ivc_client;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Bool {

    @SerializedName("answer")
    @Expose
    private Boolean answer;
    @SerializedName("bool")
    @Expose
    private String bool;

    public Boolean getAnswer() {
        return answer;
    }

    public void setAnswer(Boolean answer) {
        this.answer = answer;
    }

    public String getBool() {
        return bool;
    }

    public void setBool(String bool) {
        this.bool = bool;
    }

}
