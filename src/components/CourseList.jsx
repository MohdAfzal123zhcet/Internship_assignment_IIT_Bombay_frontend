// src/components/CourseList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CourseList({ onDelete }) {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/courses');
      setCourses(res.data);
    } catch (err) {
      setError('Error fetching courses');
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8080/api/courses/${courseId}`);
      fetchCourses();
    } catch (err) {
      alert('Cannot delete course due to dependencies.');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>All Courses</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {courses.map(course => (
          <li key={course.courseId}>
            <strong>{course.title}</strong> ({course.courseId})<br/>
            <em>{course.description}</em><br/>
            Prerequisites: {course.prerequisites.map(p => p.courseId).join(', ') || 'None'}<br/>
            <button onClick={() => handleDelete(course.courseId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
