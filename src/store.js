import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const initialState = {};
const middleWare = [];
const enhancer = () => {
    if(reduxDevTools != null){
        return compose(applyMiddleware(...middleWare), reduxDevTools);
    }
    return applyMiddleware(...middleWare);
}
const store = createStore(rootReducer, initialState, enhancer())

export default store;