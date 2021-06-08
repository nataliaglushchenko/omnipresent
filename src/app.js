import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import FormPage from './pages/formPage';

function App() {
  return (
    <>
      <Route path="/" exact component={FormPage} />
      <Redirect to="/" />
    </>
    );
}

export default App;
