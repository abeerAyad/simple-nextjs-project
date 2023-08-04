"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const UserProfilePage = ({params:{id}}) => {
    const [userProfile, setUserProfile] = useState({})
  const [post, setPost] = useState([])


    const userDetails = async () => {
        const { data: { user } } = await axios.get(`/api/users/user/${id}`)
        setUserProfile(user)
    }


  const getPost = async () => {
    const { data: { posts } } = await axios.get('/api/posts')
    const postUser = posts.filter((post) => id === post.userId._id)
    setPost(postUser);
  }

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`)
      getPost()
    } catch (error) {
      console.log(error);
    }
  }

    useEffect(() => {
        userDetails()
      getPost()

    },[])

  return (
    <div>
      <h1>{userProfile?.username}</h1>
      <h1>{userProfile?.email}</h1>
      {post?.map((post) => (
        <div key={post._id} style={{ border: '1px solid #555', marginTop: '20px' }}>
          <h1>{post?.title}</h1>
          <h1>{post?.content}</h1>
          <button onClick={() => deletePost(post._id)}>x</button>
      
        </div>
      ))}


    </div>
  )
}

export default UserProfilePage
