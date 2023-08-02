"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';

const UserProfile = () => {

    const [user, setUser] = useState({});
    const getUserProfile = async () => {
        
        const {data:{data}} = await axios.get('/api/users/profile')
        setUser(data);
        
    }

    useEffect(() => {
        getUserProfile()
    },[])

  return (

    <div>
          <Navbar />
      <h1>UserProfile</h1>
      <h2>{user.username}</h2>
          <h3>{user.email}</h3>

    </div>
  )
}


export default UserProfile
