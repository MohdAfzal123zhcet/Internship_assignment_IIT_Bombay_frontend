import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import CourseInstanceForm from './components/CourseInstanceForm';
import CourseInstanceList from './components/CourseInstanceList';
import InstanceDetail from './components/InstanceDetail';

const App = () => {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <h1>📘 Course Management App</h1>
          <nav className="nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
            >
              Home
            </NavLink>
            <NavLink
              to="/courses/new"
              className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
            >
              Create Course
            </NavLink>
            <NavLink
              to="/courses"
              end
              className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
            >
              Course List
            </NavLink>
            <NavLink
              to="/instances/new"
              className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
            >
              Create Instance
            </NavLink>
            <NavLink
              to="/instances"
              end
              className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
            >
              List Instances
            </NavLink>
            <NavLink
              to="/instance/detail"
              className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
            >
              Instance Detail
            </NavLink>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<div>Welcome! Use the menu above to manage courses.</div>} />
            <Route path="/courses/new" element={<CourseForm />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/instances/new" element={<CourseInstanceForm />} />
            <Route path="/instances" element={<CourseInstanceList />} />
            <Route path="/instance/detail" element={<InstanceDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
