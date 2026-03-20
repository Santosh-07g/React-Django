import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BASE_URL = "http://127.0.0.1:8000/api"

const ViewStudent = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  function fetchData() {
    setLoading(true)
    axios.get(`${BASE_URL}/viewstudent/`)
      .then(x => { setUsers(x.data); setLoading(false) })
      .catch(err => { console.log(err); setError("Failed to fetch students."); setLoading(false) })
  }

  useEffect(() => { fetchData() }, [])

  function handleUpdate(id) { navigate(`/updatestudent/${id}`) }

  function handleDelete(id) {
    axios.delete(`${BASE_URL}/deletestudent/${id}/`)
      .then(() => fetchData())
      .catch(err => { console.log(err); setError("Failed to delete student.") })
  }

  if (loading) return (
    <div style={styles.page}>
      <div style={styles.loadingBox}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading students...</p>
      </div>
    </div>
  )

  if (error) return (
    <div style={styles.page}>
      <div style={styles.errorBox}>⚠️ {error}</div>
    </div>
  )

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Students Record</h1>
        <p style={styles.subtitle}>{users.length} student{users.length !== 1 ? 's' : ''} registered</p>
        <button style={styles.addBtn} onClick={() => navigate('/addstudent')}>
          + Add Student
        </button>
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div style={styles.emptyBox}>
          <p style={styles.emptyIcon}>🎓</p>
          <p style={styles.emptyText}>No students found. Add one!</p>
        </div>
      )}

      {/* Student Cards Grid */}
      <div style={styles.grid}>
        {users.map((x) => (
          <div key={x.id} style={styles.card}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {/* Avatar */}
            <div style={styles.avatar}>
              {x.name.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div style={styles.info}>
              <h2 style={styles.name}>{x.name}</h2>

              <div style={styles.detailRow}>
                <span style={styles.detailIcon}>✉️</span>
                <span style={styles.detailText}>{x.email}</span>
              </div>

              <div style={styles.detailRow}>
                <span style={styles.detailIcon}>🏛️</span>
                <span style={styles.detailText}>{x.department}</span>
              </div>

              <div style={styles.detailRow}>
                <span style={styles.detailIcon}>📚</span>
                <span style={styles.detailText}>{x.course}</span>
              </div>
            </div>

            {/* Badge */}
            <div style={styles.badge}>ID #{x.id}</div>

            {/* Action Buttons */}
            <div style={styles.actions}>
              <button
                style={styles.editBtn}
                onClick={() => handleUpdate(x.id)}
                onMouseEnter={e => e.target.style.backgroundColor = '#3730a3'}
                onMouseLeave={e => e.target.style.backgroundColor = '#4f46e5'}
              >
                ✏️ Edit
              </button>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(x.id)}
                onMouseEnter={e => e.target.style.backgroundColor = '#b91c1c'}
                onMouseLeave={e => e.target.style.backgroundColor = '#ef4444'}
              >
                🗑️ Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Spinner Keyframe */}
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
    padding: '40px 20px',
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    textAlign: 'center',
    marginBottom: '36px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#1e1e2e',
    margin: '0 0 6px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    marginBottom: '16px',
  },
  addBtn: {
    padding: '10px 24px',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    position: 'relative',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  },
  avatar: {
    width: '54px',
    height: '54px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: '#fff',
    fontSize: '22px',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  info: {
    marginBottom: '20px',
  },
  name: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '12px',
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '7px',
  },
  detailIcon: {
    fontSize: '14px',
  },
  detailText: {
    fontSize: '14px',
    color: '#64748b',
  },
  badge: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#ede9fe',
    color: '#6d28d9',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '20px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  editBtn: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  deleteBtn: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  loadingBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
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
  errorBox: {
    backgroundColor: '#fff0f0',
    border: '1px solid #fca5a5',
    color: '#dc2626',
    padding: '16px 20px',
    borderRadius: '10px',
    maxWidth: '400px',
    margin: '100px auto',
    textAlign: 'center',
    fontSize: '15px',
  },
  emptyBox: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyIcon: {
    fontSize: '52px',
    marginBottom: '12px',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: '16px',
  },
}

export default ViewStudent