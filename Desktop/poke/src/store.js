import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import reducer from './reducers';

const persistConfig = { //what i want to persist
  key: 'root',
  storage,
  timeout: null,
  blacklist: [] //what i dont want to persist
}

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor };
