"use client"
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import styles from './home.module.css'
import './global.css'

export default function Home() {
  const [postList, setPostList] = useState([])
  const [user, setUser] = useState({})
  
  const [isLoading, setIsLoading] = useState(true); 

  const getAllPost = async () => {
    try {
      
      const {data:{posts}} = await axios.get('/api/posts')
      setPostList(posts);
    } catch (error) {
      console.log(error);
    }finally {
    setIsLoading(false)

    }
  }

  const deletePost = async (id) => {
    try {
    await axios.delete(`/api/posts/${id}`)
    getAllPost()
    } catch (error) {
      console.log(error);
    }
  }

  const userInfo = async () => {
    const {data: {userData}} = await axios.get('/api/users/user')
    setUser(userData);
  }

  useEffect(() => {
    getAllPost()
    userInfo()
  },[])
  return (
  <>
  <Navbar />

  
      <div className={styles.container}>
        <h1 className={styles.title}>Home</h1>
        {user._id && (
          <button className={styles.createPostButton}>
            <Link href={`/newPost`} className={styles.link}>Create Post</Link>
          </button>
        )}

  <div className={styles.postList}>
    {isLoading? (<p>Loading ...</p>)
  :(
    postList.map((post) => (
      <div key={post._id} className={styles.postCard}>
        <div className={styles.postUser}>
          {post.userId._id === user._id ? (
            <Link href='/profile' className={styles.link}>{post.userId.username}</Link>
          ) : (
            <Link href={`/profile/${post.userId._id}`} className={styles.link}>{post.userId.username}</Link>
          )}
        </div>
    <h2 className={styles.postTitle}>
        <Link href={`/post/${post._id}`} className={styles.link}>{post.title}</Link>
    </h2>
    <p className={styles.postContent}>{post.content}</p>

   { post.userId?._id === user?._id && 
   (<button onClick={() => deletePost(post._id)} className={styles.deleteButton}>Delete</button>)
   }

    { post.userId?._id ===user._id && 
    (<button  className={styles.editButton}>
      <Link className={styles.link} href={`/edit/${post._id}`}>edit</Link>
      </button>)
    }


    </div>
 ))
 )}
      </div>
      </div>
      </>
  )
}
