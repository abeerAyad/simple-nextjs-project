"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Link from 'next/link';

const UserProfile = () => {
  const [posts, setPosts] = useState([])

    const [user, setUser] = useState({});
    
    const getUserProfile = async () => {
        const {data:{userData}} = await axios.get('/api/users/user')
      setUser(userData);
    }

  const getPosts = async () => {
    const { data: { posts } } = await axios.get('/api/posts')
    const postUser = posts.filter((post) => post.userId?._id === user?._id)
    setPosts(postUser);
  }
  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`)
      getPosts()
    } catch (error) {
      console.log(error);
    }
  }


    useEffect(() => {
        getUserProfile()
    getPosts()

    },[])

  return (

    <div>
          <Navbar />
      <h1>UserProfile</h1>
      <h2>{user?.username}</h2>
          <h3>{user?.email}</h3>
      {posts?.map((post) => (
          post?(<div key={post?._id} style={{ border: '1px solid #555', marginTop: '20px' }}>
          <h1>{post?.title}</h1>
          <h1>{post?.content}</h1>
          {post?.userId?._id === user?._id &&
            (<button onClick={() => deletePost(post._id)}>x</button>)
          }

          {post?.userId?._id === user?._id &&
            (<button><Link href={`/edit/${post._id}`}>edit</Link></button>)
          }

        </div>):"Loading ...."

      
      ))}

    </div>
  )
}


export default UserProfile
