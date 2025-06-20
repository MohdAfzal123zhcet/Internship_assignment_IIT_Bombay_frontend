// src/App.jsx
import React from "react";
import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";
import CourseInstanceForm from "./components/CourseInstanceForm";
import CourseInstanceList from "./components/CourseInstanceList";
import InstanceDetail from "./components/InstanceDetail";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📘 Course Management Dashboard</h1>
      <hr />
      <h2>Create a New Course</h2>
      <CourseForm />
      <hr />
      <h2>List of Courses</h2>
      <CourseList />
      <hr />
      <h2>Create Course Instance</h2>
      <CourseInstanceForm />
      <hr />
      <h2>List Course Instances</h2>
      <CourseInstanceList />
      <hr />
      <h2>Course Instance Detail</h2>
      <InstanceDetail />
    </div>
  );
}

export default App;
