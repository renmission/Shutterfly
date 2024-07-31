import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    loading: false,
    error: false,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        fetchPostsStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        fetchPostsSuccess: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = false;
        },
        fetchPostsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deletePostStart: (state) => {
            state.loading = true;
        },
        deletePostSuccess: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
            state.loading = false;
            state.error = false;
        },
        deletePostFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { 
    fetchPostsStart, 
    fetchPostsSuccess, 
    fetchPostsFail, 
    deletePostStart, 
    deletePostSuccess, 
    deletePostFail 
} = postSlice.actions;

export default postSlice.reducer;