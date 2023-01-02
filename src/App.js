/** @format */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Todo from './pages/Todo';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Header />
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;