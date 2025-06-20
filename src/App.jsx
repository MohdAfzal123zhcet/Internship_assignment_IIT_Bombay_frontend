import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
            <Link to="/">Home</Link>
            <Link to="/courses/new">Create Course</Link>
            <Link to="/courses">Course List</Link>
            <Link to="/instances/new">Create Instance</Link>
            <Link to="/instances">List Instances</Link>
            <Link to="/instance/detail">Instance Detail</Link>
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
