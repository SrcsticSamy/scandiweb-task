import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './App';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import { Provider } from 'react-redux';
import {store} from './Redux/store';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});


ReactDOM.render(
  <React.StrictMode>

    <ApolloProvider client={client}>

      <Provider store={store}>
        <App />
      </Provider>
      
    </ApolloProvider>

  </React.StrictMode>,
  document.getElementById('root')
);