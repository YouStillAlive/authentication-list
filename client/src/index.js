import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
//import User, { UserContext } from './context/user.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserStore from './store/user.js';

export const Context = createContext(null);

ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value={ {
            user: new UserStore()
        }}>
            <App />
        </Context.Provider>
    </React.StrictMode>
    ,
    document.getElementById('root'));

reportWebVitals();