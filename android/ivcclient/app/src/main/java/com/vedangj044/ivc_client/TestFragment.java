package com.vedangj044.ivc_client;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.google.android.material.radiobutton.MaterialRadioButton;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.http.Body;
import retrofit2.http.POST;

public class TestFragment extends Fragment {

    Question question;
    public void setQuestion(Question question) {
        this.question = question;
    }

    private final String name = "Vedang Joshi";

    interface sendAnswers{
        @POST("/answer")
        Call<Answer> send(@Body List<Answer> answer);
    }

    private Retrofit retrofit;

    public void setRetrofit(Retrofit retrofit) {
        this.retrofit = retrofit;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.question_layout, container, false);

        Long time = System.currentTimeMillis();

        TextView blankQuestion = view.findViewById(R.id.blank_question);
        blankQuestion.setText(question.getBlank().getBlank());

        MaterialRadioButton blankOp1 = view.findViewById(R.id.blank_option1);
        MaterialRadioButton blankOp2 = view.findViewById(R.id.blank_option2);
        MaterialRadioButton blankOp3 = view.findViewById(R.id.blank_option3);
        MaterialRadioButton blankOp4 = view.findViewById(R.id.blank_option4);

        blankOp1.setText(question.getBlank().getOption2());
        blankOp2.setText(question.getBlank().getAnswer());
        blankOp3.setText(question.getBlank().getOption1());
        blankOp4.setText(question.getBlank().getOption3());

        List<Answer> answer = new ArrayList<>();

        RadioGroup blankRadioGroup = view.findViewById(R.id.blank_radiogroup);
        blankRadioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {

                String t1 = String.valueOf((System.currentTimeMillis() - time)/1000F);

                if(checkedId == R.id.blank_option2){
                    answer.add(new Answer(name, t1, true));
                }
                else{
                    answer.add(new Answer(name, t1, false));
                }
            }
        });

        TextView boolQuestion = view.findViewById(R.id.bool_question);
        boolQuestion.setText(question.getBool().getBool());

        RadioGroup boolRadioGroup = view.findViewById(R.id.bool_radiogroup);
        boolRadioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {

                String t2 = String.valueOf((System.currentTimeMillis() - time)/1000F);

                if((checkedId == R.id.bool_true && question.getBool().getAnswer()) ||
                checkedId == R.id.bool_false && !question.getBool().getAnswer()){
                    answer.add(new Answer(name, t2, true));
                }
                else{
                    answer.add(new Answer(name, t2, false));
                }
            }
        });

        sendAnswers response = retrofit.create(sendAnswers.class);

        Button submitButton = view.findViewById(R.id.submit_button);
        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Call<Answer> call = response.send(answer);
                call.enqueue(new Callback<Answer>() {
                    @Override
                    public void onResponse(Call<Answer> call, Response<Answer> response) {

                        Toast.makeText(getContext(), "Response Submitted", Toast.LENGTH_SHORT).show();
                        MainActivity.shouldLoad = false;
                        getActivity().getSupportFragmentManager().beginTransaction().remove(TestFragment.this)
                                .commit();

                    }

                    @Override
                    public void onFailure(Call<Answer> call, Throwable t) {

                    }
                });
            }
        });

        return view;
    }
}
