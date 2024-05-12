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
        createPost: {
            // To keep the reducer function "pure", non-deterministic logic such as the
            // generation of a unique ID/getting current date time should be done as part
            // of the payload creation.
            //
            // `createSlice` allows for a prepare callback to be configured so that the
            // eventual payload that goes into the reducer action will contain the
            // generated values.   
            prepare: function (postDetails) {
                const currentTimestamp = Date.now();
                return {
                    // Recall that all payload has to be nested inside `payload` field.
                    payload: {
                        ...postDetails,
                        id: nanoid(),
                        createdAt: currentTimestamp,
                        updatedAt: currentTimestamp,
                    },
                }
            },
            reducer: function (state, action) {
                // Notice that this function does nothing else but mutating the state.
                // No external calls, no non-deterministic functions.
                //
                // If there were to be function calls in this reducer, they have to be
                // pure as well.
                //
                // It is also alright to mutate the `state` directly because redux-toolkit
                // makes use of the Immer package, which does the state immutability magic
                // for us.
                state.value.push(action.payload);
            },
        },

        editPost: {
            prepare: function (postDetails) {
                const currentTimestamp = Date.now();
                return {
                    payload: {
                        ...postDetails,
                        updatedAt: currentTimestamp,
                    },
                }
            },
            reducer: function(state, action) {
                const { id, content, title, updatedAt } = action.payload;
            
                const postToBeEdited = state.value.find(post => post.id === id);
                if (!postToBeEdited) {
                    // We could not find the post based on id. We probably can set an
                    // error state here to alert the frontend.
                    console.error("Could not find post by id", id);
                    return;
                }
    
                // Because objects are "references", we can update its attributes in-place.
                postToBeEdited.content = content;
                postToBeEdited.title = title;
                postToBeEdited.updatedAt = updatedAt;
            },
        },

        deletePost: function (state, action) {
            const { id } = action.payload;
            
            const indexToBeDeleted = state.value.findIndex(post => post.id === id);
            if (indexToBeDeleted < 0) {
                // We could not find the post based on id. We probably can set an
                // error state here to alert the frontend.
                console.error("Could not find post by id for deletion", id);
                return;
            }

            // Array.splice removes elements in-place
            state.value.splice(indexToBeDeleted, 1);
        }
    }
});

export const selectAllPosts = () => (state) => state.posts.value;
export const selectPostById = (id) => (state) => state.posts.value.find(post => post.id === id);

// These will be used by downstream modules when dispatching actions to the store
export const { createPost, editPost, deletePost } = postsSlice.actions;

// This is used to configure the root reducer
export default postsSlice.reducer;
