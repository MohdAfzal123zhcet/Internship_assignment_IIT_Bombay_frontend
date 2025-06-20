// src/components/CourseInstanceForm.jsx
import React, { useState, useEffect } from 'react';

const CourseInstanceForm = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch courses from backend
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/api/courses')
      .then(res => {
        console.log("Status:", res.status);
        if (!res.ok) throw new Error("Failed to fetch courses.");
        return res.json();
      })
      .then(data => {
        console.log("Fetched courses:", data);
        // if data is wrapped in { content: [] }, use data.content
        setCourses(Array.isArray(data) ? data : data.content || []);
      })
      .catch(err => {
        console.error('Error fetching courses:', err);
        setMessage('Failed to load courses.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    if (!selectedCourseId) {
      setMessage("Please select a course.");
      setSubmitting(false);
      return;
    }

    const payload = {
      academicYear: parseInt(year),
      semester: parseInt(semester),
      course: {
        courseId: selectedCourseId
      }
    };

    try {
      const res = await fetch('http://localhost:8080/api/instances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setMessage(' Course instance created successfully.');
        setYear('');
        setSemester('');
        setSelectedCourseId('');
      } else {
        const err = await res.text();
        setMessage(` Error: ${err}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setMessage(' Failed to create course instance.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create Course Instance</h2>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Academic Year:</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Semester:</label>
            <input
              type="number"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Course:</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              required
            >
              <option value="">Select a course</option>
              {courses.length > 0 ? (
                courses.map(course => (
                  <option key={course.courseId} value={course.courseId}>
                    {course.title} ({course.courseId})
                  </option>
                ))
              ) : (
                <option value="" disabled>No courses available</option>
              )}
            </select>
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Create Instance"}
          </button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default CourseInstanceForm;
