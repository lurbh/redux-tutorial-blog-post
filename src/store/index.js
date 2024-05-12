import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import postsReducer from './posts/reducer';

const store = configureStore({
    reducer: { // This configures the root reducer for the store
        posts: postsReducer,
    },
    // devTools: true, // Enable this to allow for the Redux DevTools extension integration
})

/**
 * Wraps the `Component` with a store context provider.
 * This is an example of a higher-order function - it takes an existing
 * functional component and returns a new one.
 */
export function withStore(Component) {
    return (props) => (
        <Provider store={store}>
            <Component {...props}/>
        </Provider>
    );
}
