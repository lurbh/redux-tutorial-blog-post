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
        createPost: {
            prepare: function(input) {
                return {
                    payload : {
                        id: nanoid(),
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                        title: input.title,
                        content: input.content,
                    }
                }
            },
            reducer: function (state, action) {
                state.value.push({
                    id: action.payload.id,
                    createdAt: action.payload.createdAt,
                    updatedAt: action.payload.updatedAt,
                    title: action.payload.title,
                    content: action.payload.content,
                })
            }
        },

        /** @param {{type: string, payload: Post} action} */
        editPost: {
            prepare: function(input) {
                return {
                    payload : {
                        ...input,
                        updatedAt: Date.now()
                    }
                }
            },
            reducer: function (state, action) {
                const post = state.value.find((p) => p.id === action.payload.id)
                if(!post)
                {
                    throw new Error("Cannot Find post for ID " + action.payload.id);
                }
                post.content = action.payload.content;
                post.title = action.payload.title;
                post.updatedAt = action.payload.updatedAt;
            }
        },

        deletePost:  function (state, action) {
            const index = state.value.findIndex((p) => p.id === action.payload.id)
            if(index < 0)
            {
                throw new Error("Cannot Find post for ID " + action.payload.id);
            }
            state.value.splice(index,1)
        }
    }
});

export const selectAllPosts = () => (state) => state.posts.value;

export const selectPostById = (id) => (state) => {
    // TODO: Complete this - to find a post by its ID
    // Recall that `state` refers to the root state
    const post = state.posts.value.find((post) => post.id === id)
    if(post < 0)
    {
        throw new Error("Cannot Find post for ID " + id);
    }
    return post;
}

// These will be used by downstream modules when dispatching actions to the store
export const { createPost, editPost, deletePost } = postsSlice.actions;

// This is used to configure the root reducer
export default postsSlice.reducer;
