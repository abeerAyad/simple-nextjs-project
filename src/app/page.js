"use client"
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'

export default function Home() {
  const [postList, setPostList] = useState([])
  const [user, setUser] = useState({})

  const getAllPost = async () => {
    const {data:{posts}} = await axios.get('/api/posts')
    setPostList(posts);
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

  <h1>Home</h1>
  {user?._id && (<button><Link href={`/newPost`}>createPost</Link></button>)}

  <div>
  {postList?.map((post) => (
    <div key={post._id} style={{border:'1px solid #555', marginTop:'20px'}}>

      <div>{ post?.userId._id === user?._id
      ?(<Link href='/profile'>{post?.userId?.username}</Link>) 
      : (<Link href={`/profile/${post?.userId?._id}`}>{post?.userId?.username}</Link>)}
        </div>

    <h1><Link href={`/post/${post?._id}`}>{post?.title}</Link></h1>
    <h1>{post?.content}</h1>

   { post?.userId?._id === user?._id && 
   (<button onClick={() => deletePost(post._id)}>x</button>)
   }

    { post?.userId?._id ===user?._id && 
    (<button><Link href={`/edit/${post._id}`}>edit</Link></button>)
    }


    </div>


  ))}
      </div>
      </>
  )
}
