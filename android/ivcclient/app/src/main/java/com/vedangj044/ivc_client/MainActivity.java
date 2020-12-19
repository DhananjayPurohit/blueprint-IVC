package com.vedangj044.ivc_client;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Toast;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;

public class MainActivity extends AppCompatActivity {

    interface getQuestion{
        @GET("/question")
        Call<Question> getQuestion();
    }

    private Retrofit retrofit;

    public static boolean shouldLoad = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        retrofit = new Retrofit.Builder()
                .baseUrl("http://10.0.2.2:5000")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        getQuestion question = retrofit.create(getQuestion.class);

        Call<Question> call = question.getQuestion();

        if(shouldLoad){
            call.enqueue(new Callback<Question>() {
                @Override
                public void onResponse(Call<Question> call, Response<Question> response) {
                    TestFragment fragment = new TestFragment();

                    fragment.setQuestion(response.body());
                    fragment.setRetrofit(retrofit);
                    getSupportFragmentManager().beginTransaction().add(android.R.id.content, fragment, "test").commit();
                }

                @Override
                public void onFailure(Call<Question> call, Throwable t) {
                    Toast.makeText(MainActivity.this, "Error" + t.getMessage(), Toast.LENGTH_SHORT).show();
                }
            });
        }
    }
}