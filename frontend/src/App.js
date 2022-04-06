import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './components/Home';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import Notebooks from './components/Notebooks';
import IndieNotebook from './components/IndieNotebook';
import Notes from './components/Notes';
import IndieNote from './components/IndieNote';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';

import * as sessionActions from './store/session';


function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact>
            {sessionUser ? <Home /> : <Redirect to='/signup' />}
          </Route>

          <Route path='/login'>
            <LoginFormPage />
          </Route>

          <Route path='/signup'>
            <SignupFormPage />
          </Route>

          <Route path='/notebooks' exact>
            {sessionUser ? <Notebooks /> : <Redirect to='/signup' />}
          </Route>

          <Route path='/notebooks/:notebookId'>
            {sessionUser ? <IndieNotebook /> : <Redirect to='/signup' />}
          </Route>

          <Route path='/notes' exact>
            {sessionUser ? <Notes /> : <Redirect to='/signup' />}
          </Route>

          <Route path='/notes/:noteId'>
            {sessionUser ? <IndieNote /> : <Redirect to='/signup' />}
          </Route>

          <Route>
            {sessionUser ? <PageNotFound /> : <Redirect to='/login' />}
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
