// import { createStore , applyMiddleware , compose } from 'redux';
// import reducers from './reducers/index';
// import thunk from 'redux-thunk';

// const store = createStore(
//     reducers,
//     applyMiddleware(thunk)
// );

// export default store;
import {createStore, applyMiddleware} from "redux";
//import {reducers} from './redux/reducers';
import {reducers} from './reducers';
import thunk from "redux-thunk";
import promise from 'redux-promise'

let store=createStore(reducers,applyMiddleware(thunk,promise));
export default store;