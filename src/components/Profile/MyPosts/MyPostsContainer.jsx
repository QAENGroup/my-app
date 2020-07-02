import React from 'react';
import { } from "../../../redux/store";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    let onPostChange = (text) => {
        let action = updateNewPostTextActionCreator(text);
        props.store.dispatch (action);
    }
    let state = props.store.getState();

    return (
        <MyPosts
            updateNewPostText = {onPostChange}
            addPost={addPost}
            posts={state.profilePage.posts}
            newPostText={state.profilePage.newPostText}
        />
    )
}

export default MyPostsContainer;
