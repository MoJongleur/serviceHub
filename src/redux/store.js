// Components
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync'

// Reducers
import search from './reducers/search';
import bookmarks from './reducers/bookmark';

const env = process.env.NODE_ENV

const appReducers = {
  search,
  bookmarks
}

const config = {
  whitelist: ['MOVE_TO_BOOKMARKS', 'MOVE_FROM_BOOKMARKS'],
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['bookmarks']
}

const rootReducer = combineReducers({
  ...appReducers
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [thunk, createStateSyncMiddleware(config)];
if (env === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { logger } = require('redux-logger')
  middleware.push(logger)
}

export const store = createStore(persistedReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);

initMessageListener(store);
