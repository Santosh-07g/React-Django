import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav style={styles.nav}>

      {/* Text Logo */}
      <Link to="/" style={styles.logoLink}>
        <span style={styles.logoIcon}>S</span>
        <span style={styles.logoText}>StudentMS</span>
      </Link>

      {/* Nav Links */}
      <div style={styles.right}>
        <Link to="/addstudent" style={styles.link}
          onMouseEnter={e => e.target.style.backgroundColor = '#f1f0ff'}
          onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
        >
          Add Student
        </Link>
        <Link to="/viewstudent" style={styles.link}
          onMouseEnter={e => e.target.style.backgroundColor = '#f1f0ff'}
          onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
        >
          View Students
        </Link>
      </div>

    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70px',
    backgroundColor: '#ffffff',
    padding: '0 40px',
    borderBottom: '2px solid #f0f0f0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    fontFamily: "'Segoe UI', sans-serif",
  },
  logoLink: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: '800',
    fontSize: '18px',
  },
  logoText: {
    fontWeight: '800',
    fontSize: '20px',
    color: '#1e1e2e',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  link: {
    color: '#555',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    padding: '8px 18px',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
  },
}

export default Nav