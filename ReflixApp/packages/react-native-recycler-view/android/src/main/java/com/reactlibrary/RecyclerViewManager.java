package com.reactlibrary;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.annotations.ReactProp;
import android.util.Log;
import android.view.View;

import androidx.appcompat.widget.AppCompatCheckBox;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

import java.util.ArrayList;

public class RecyclerViewManager extends ViewGroupManager<RecyclerView> {

    public static final String REACT_CLASS = "RecyclerView";
    private ArrayList<Movie> movieList = new ArrayList<Movie>();
    private MoviesAdapter adapter;
    private ThemedReactContext reactContext;
    private RecyclerView recyclerView;
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public RecyclerView createViewInstance(ThemedReactContext c) {
        for(int i = 0; i< 20; i++){
            movieList.add(new Movie("riiip","https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX182_CR0,0,182,268_AL_.jpg","1"));
        }
        reactContext = c;
        recyclerView = new RecyclerView(c);

        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(c);
        recyclerView.setLayoutManager(layoutManager);
        LinearLayoutManager layout = new LinearLayoutManager(c, LinearLayoutManager.HORIZONTAL, false);
        recyclerView.setLayoutManager(layout);

        adapter = new MoviesAdapter(movieList, c);
        recyclerView.setAdapter(adapter);
        setListeners();

        return recyclerView;

    }
    private void setListeners(){
        adapter.setOnItemClickListener(new MoviesAdapter.ClickListener() {
            @Override
            public void onItemClick(int position, View view) {
                Log.d("position",String.valueOf(position));
                //onReceiveNativeEvent(position, reactContext);
            }
        });
    }
    @ReactProp(name = "data")
    public void setData(RecyclerView view, ReadableArray data){
        for (int i = 0; i < data.size(); i++){
            String poster_url = data.getMap(i).getString("poster_url");
            String title = data.getMap(i).getString("title");
            String _id = data.getMap(i).getString("_id");

            Movie movieData = new Movie(title,poster_url,_id);
            movieList.add(i, movieData);
        }
        //movieList.subList(data.size(), movieList.size()).clear();

    }
}
