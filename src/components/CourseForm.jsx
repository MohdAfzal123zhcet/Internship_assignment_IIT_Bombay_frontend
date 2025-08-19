import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseForm = ({ course, onSuccess = () => {}, onCancel = () => {} }) => {
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  // 👇 New state for prerequisites
  const [prerequisites, setPrerequisites] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    // Fetch all existing courses for prerequisite selection
    axios.get("http://localhost:8080/api/courses")
      .then((res) => setAllCourses(res.data))
      .catch((err) => console.error("Failed to load courses", err));

    if (course) {
      setCourseId(course.courseId);
      setTitle(course.title);
      setDescription(course.description);
      // Pre-fill prerequisites if editing
      if (course.prerequisites) {
        setPrerequisites(course.prerequisites.map(p => p.courseId));
      }
    }
  }, [course]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      courseId,
      title,
      description,
      prerequisites: prerequisites.map(id => ({ courseId: id }))  
    };

    console.log("Submitting:", newCourse);

    try {
      let response;
      if (course) {
        response = await axios.put(`http://localhost:8080/api/courses/${courseId}`, newCourse);
      } else {
        response = await axios.post("http://localhost:8080/api/courses", newCourse);
      }

      console.log("Response:", response.data);
      setMessage(" Course saved successfully!");
      onSuccess(); // will not crash now
    } catch (error) {
      console.error("Error:", error);
      setMessage(" Failed to save course. Check backend logs.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>{course ? "Update Course" : "Add Course"}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Course ID:
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
            disabled={!!course}
            style={styles.input}
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ ...styles.input, height: "60px" }}
          />
        </label>

        {/*  Prerequisites multi-select dropdown */}
        <label>
          Prerequisites:
          <select
            multiple
            value={prerequisites}
            onChange={(e) =>
              setPrerequisites(
                Array.from(e.target.selectedOptions, option => option.value)
              )
            }
            style={{ ...styles.input, height: "100px" }}
          >
            {allCourses
              .filter(c => c.courseId !== courseId) // do not list self
              .map(c => (
                <option key={c.courseId} value={c.courseId}>
                  {c.courseId} - {c.title}
                </option>
              ))}
          </select>
        </label>

        <div style={styles.buttonRow}>
          <button type="submit" style={styles.button}>
            {course ? "Update" : "Create"}
          </button>
          <button type="button" onClick={onCancel} style={{ ...styles.button, backgroundColor: "#ccc" }}>
            Cancel
          </button>
        </div>

        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    margin: "20px auto",
    backgroundColor: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  },
  button: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#1976d2",
    color: "white",
    cursor: "pointer",
  },
  message: {
    marginTop: "10px",
    fontWeight: "bold",
  },
};

export default CourseForm;
