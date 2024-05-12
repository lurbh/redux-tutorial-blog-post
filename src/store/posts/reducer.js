import { createSlice, nanoid } from '@reduxjs/toolkit';
import { mockedPosts } from './mocks';

/**
 * @typedef {Object} Post
 * @property {string} id - the unique identifier for the post
 * @property {string} title - the title of the post
 * @property {string} content - the body of the post
 * @property {number} createdAt - timestamp in milliseconds of the creation of the post
 * @property {number} updatedAt - timestamp in milliseconds of the last update of the post
 */

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        // Just some mock data for demo. Ideally, these data should be obtained via some API
        // and set accordingly into the store. (For this case, the API call should not be done
        // within a reducer due to the async nature and non-determinism)
        value: mockedPosts,
    },
    reducers: {
        /** @param {{type: string, payload: Post} action} */
        createPost: function (state, action) {
            // TODO: Add the new post into the state
        },

        /** @param {{type: string, payload: Post} action} */
        editPost: function (state, action) {
            // TODO: Find the post by id, then update its contents
        },

        deletePost: function (state, action) {
           // TODO: Find the post by id, then delete it from state
        }
    }
});

export const selectAllPosts = () => (state) => state.posts.value;

export const selectPostById = (id) => (state) => {
    // TODO: Complete this - to find a post by its ID
    // Recall that `state` refers to the root state
}

// These will be used by downstream modules when dispatching actions to the store
export const { createPost, editPost, deletePost } = postsSlice.actions;

// This is used to configure the root reducer
export default postsSlice.reducer;
