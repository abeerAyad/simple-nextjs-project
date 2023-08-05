import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const router = useRouter()
    const logout = async () => {
        await axios.get('/api/users/logout')
        router.push('/login')
    }
  return (
    <div style={styles.navbar}>
      <h1 style={styles.logo}>Next</h1>
      <button style={styles.logoutButton} onClick={logout}>Logout</button>
    </div>
  )
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    margin:0,
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default Navbar
