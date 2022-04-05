import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Notebooks from './components/Notebooks';
import Notes from './components/Notes'
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import IndieNotebook from './components/IndieNotebook'

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact>
            <h2>Home</h2>
          </Route>

          <Route path='/login'>
            <LoginFormPage />
          </Route>

          <Route path='/signup'>
            <SignupFormPage />
          </Route>

          <Route path='/notebooks'>
            <Notebooks />
          </Route>

          <Route path='/notebooks/:notebookId'>
            <IndieNotebook />
          </Route>

          <Route path='/notes'>
            <Notes />
          </Route>

          <Route>
            <h2>PAGE NOT FOUND</h2>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
