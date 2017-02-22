import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {selectSubreddit, fetchPosts, fetchPostsIfNeeded} from './actions';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();
const timeOutScheduler = store => next => action => {
    if (!action.meta || !action.meta.delay) {
        return next(action);
    }
    const timoutId = setTimeout(() => next(action), action.meta.delay);
    return () => {
        clearTimeout(timoutId);
    }

}
const store = createStore (rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware, timeOutScheduler));

store.dispatch(selectSubreddit('reactjs'));
//store.dispatch(fetchPosts('reactjs')).then(() => 
    console.log(store.getState())
//);
//store.dispatch(fetchPostsIfNeeded('reactjs')).then (() => 
//    console.log(store.getState())
//)
store.dispatch(Object.assign({}, selectSubreddit('timeout'), {meta: {delay: 1}}));