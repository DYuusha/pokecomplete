import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import AppLayout from './src/nave/AppLayout';
import Loading from './src/shared/components/Loading';
export default class App extends Component{
    render() {
      return(
        <Provider store={store}>
          <PersistGate
            loading={<Loading />}
            persistor={persistor}
          >
            <AppLayout />
          </PersistGate>
        </Provider>
      );
    }
  }

