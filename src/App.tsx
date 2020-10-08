// Modules
import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect    
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Components
import AppShell from './components/appShell'

// Material
import CircularProgress from '@material-ui/core/CircularProgress';

// Store
import { store, persistor } from './redux/store';

// Lazy pages
const Search = lazy(() => import('./pages/search'));
const Bookmarks = lazy(() => import('./pages/bookmarks'));

const LoadingFallbackApp = () => (
  <AppShell>
    <CircularProgress />
  </AppShell>
);
const LoadingFallbackPage = () => (
  <CircularProgress />
);

const AppRoutes = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<LoadingFallbackApp />}>
          <Switch>
            <Route path='/search'>
              <AppShell>
                <Suspense fallback={<LoadingFallbackPage />}>
                  <Search />
                </Suspense>
              </AppShell>
            </Route>
            <Route path='/bookmarks'>
              <AppShell>
                <Suspense fallback={<LoadingFallbackPage />}>
                  <Bookmarks />
                </Suspense>
              </AppShell>
            </Route>
            <Route path='/'>
              <Redirect to="/search" />
            </Route>
          </Switch>
        </Suspense>
      </PersistGate>
    </Provider>
  )
}

function App() {
  return (
    <Router>
      <div>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
