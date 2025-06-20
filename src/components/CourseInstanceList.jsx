// src/components/InstanceList.jsx
import React, { useState } from 'react';

const CourseInstanceList = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [instances, setInstances] = useState([]);
  const [message, setMessage] = useState('');

  const fetchInstances = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/instances/${year}/${semester}`);
      if (response.ok) {
        const data = await response.json();
        setInstances(data);
        setMessage('');
      } else {
        setMessage('Error fetching instances.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to fetch data.');
    }
  };

  const handleDelete = async (courseId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/instances/${year}/${semester}/${courseId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setInstances(instances.filter(i => i.course.courseId !== courseId));
        setMessage('Deleted successfully.');
      } else {
        const text = await res.text();
        setMessage(`Error: ${text}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Delete failed.');
    }
  };

  return (
    <div>
      <h2>Course Instances by Year & Semester</h2>
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
        <button onClick={fetchInstances}>Fetch Instances</button>
      </div>

      {message && <p>{message}</p>}

      {instances.length > 0 && (
        <table border="1" cellPadding="5" style={{ marginTop: '10px' }}>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Title</th>
              <th>Academic Year</th>
              <th>Semester</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {instances.map(instance => (
              <tr key={instance.id}>
                <td>{instance.course.courseId}</td>
                <td>{instance.course.title}</td>
                <td>{instance.academicYear}</td>
                <td>{instance.semester}</td>
                <td>
                  <button onClick={() => handleDelete(instance.course.courseId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseInstanceList;
