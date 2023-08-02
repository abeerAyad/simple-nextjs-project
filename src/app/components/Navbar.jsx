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
    <div style={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
      <h1>Next</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar
