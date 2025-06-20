// src/components/InstanceDetail.jsx
import React, { useState } from 'react';

const InstanceDetail = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseId, setCourseId] = useState('');
  const [instance, setInstance] = useState(null);
  const [message, setMessage] = useState('');

  const fetchDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/instances/${year}/${semester}/${courseId}`
      );
      if (response.ok) {
        const data = await response.json();
        setInstance(data);
        setMessage('');
      } else {
        const errorText = await response.text();
        setInstance(null);
        setMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to fetch course instance details.');
    }
  };

  return (
    <div>
      <h2>Course Instance Detail</h2>
      <div>
        <input
          type="number"
          placeholder="Academic Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="number"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course ID (e.g., CS101)"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <button onClick={fetchDetails}>Fetch Details</button>
      </div>

      {message && <p>{message}</p>}

      {instance && (
        <div style={{ marginTop: '10px' }}>
          <p><strong>Course ID:</strong> {instance.course.courseId}</p>
          <p><strong>Title:</strong> {instance.course.title}</p>
          <p><strong>Description:</strong> {instance.course.description}</p>
          <p><strong>Academic Year:</strong> {instance.academicYear}</p>
          <p><strong>Semester:</strong> {instance.semester}</p>
        </div>
      )}
    </div>
  );
};

export default InstanceDetail;
