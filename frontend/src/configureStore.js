import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import rootReducer from './reducers';
import rootEpic from './epics';
import {
    loadAuth
} from './services/local-storage';



export default function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    var persistedState = {
        auth: {
            user: loadAuth() || {}
        }
    };

    const store =  createStore(
        rootReducer,
        persistedState,
        composeEnhancers(
            applyMiddleware(
                createEpicMiddleware(rootEpic)
            )
        )
    );

    return store;
}
