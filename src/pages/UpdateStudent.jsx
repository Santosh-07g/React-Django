import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = "http://127.0.0.1:8000/api"

const UpdateStudent = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")
  const [course, setCourse] = useState("")
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    axios.get(`${BASE_URL}/getstudent/${id}/`)
      .then((x) => {
        setName(x.data.name)
        setEmail(x.data.email)
        setDepartment(x.data.department)
        setCourse(x.data.course)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError("Failed to load student data.")
        setLoading(false)
      })
  }, [id])

  function handleUpdate(e) {
    e.preventDefault()
    setUpdating(true)
    setError(null)
    const newData = { name, email, department, course }
    axios.put(`${BASE_URL}/updatestudent/${id}/`, newData, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => navigate("/viewstudent"))
      .catch(err => {
        console.log(err)
        setError("Update failed. Please try again.")
        setUpdating(false)
      })
  }

  // Loading State
  if (loading) return (
    <div style={styles.page}>
      <div style={styles.loadingBox}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading student data...</p>
      </div>
      <style>{`
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )

  // Error State
  if (error && !name) return (
    <div style={styles.page}>
      <div style={styles.errorBox}>⚠️ {error}</div>
    </div>
  )

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          {/* Avatar with initial */}
          <div style={styles.avatar}>
            {name.charAt(0).toUpperCase()}
          </div>
          <h1 style={styles.title}>Update Student</h1>
          <p style={styles.subtitle}>Editing details for <strong>{name}</strong> — ID #{id}</p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.errorBox}>
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleUpdate} style={styles.form}>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              onFocus={e => e.target.style.borderColor = '#4f46e5'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              onFocus={e => e.target.style.borderColor = '#4f46e5'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Department</label>
            <input
              type="text"
              placeholder="Enter department"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              style={styles.input}
              onFocus={e => e.target.style.borderColor = '#4f46e5'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Course</label>
            <input
              type="text"
              placeholder="Enter course"
              required
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              style={styles.input}
              onFocus={e => e.target.style.borderColor = '#4f46e5'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {/* Buttons */}
          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => navigate("/viewstudent")}
              style={styles.cancelBtn}
              onMouseEnter={e => e.target.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={e => e.target.style.backgroundColor = '#ffffff'}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              style={{ ...styles.submitBtn, opacity: updating ? 0.7 : 1 }}
            >
              {updating ? "Updating..." : "✔ Update Student"}
            </button>
          </div>

        </form>
      </div>

      <style>{`
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.10)',
    padding: '40px',
    width: '100%',
    maxWidth: '480px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: '#fff',
    fontSize: '26px',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 14px auto',
    boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
  },
  title: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#1e1e2e',
    margin: '0 0 6px 0',
  },
  subtitle: {
    fontSize: '13px',
    color: '#94a3b8',
    margin: 0,
  },
  errorBox: {
    backgroundColor: '#fff0f0',
    border: '1px solid #fca5a5',
    color: '#dc2626',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '15px',
    color: '#1e293b',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    backgroundColor: '#f8fafc',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  cancelBtn: {
    flex: 1,
    padding: '13px',
    borderRadius: '8px',
    border: '2px solid #e2e8f0',
    backgroundColor: '#ffffff',
    color: '#64748b',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  submitBtn: {
    flex: 2,
    padding: '13px',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(79,70,229,0.4)',
    transition: 'opacity 0.2s ease',
  },
  loadingBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  spinner: {
    width: '44px',
    height: '44px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #4f46e5',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: '15px',
  },
}

export default UpdateStudent