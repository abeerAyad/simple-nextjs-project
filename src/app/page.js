"use client"
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'

export default function Home() {
  const [postList, setPostList] = useState([])

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

 
  useEffect(() => {
    getAllPost()
  },[])
  return (
  <>
            <Navbar />

  <h1>Home</h1>
  <button><Link href={`/newPost`}>createPost</Link></button>


  <div>
  {postList?.map((post) => (
    <div key={post._id} style={{border:'1px solid #555', marginTop:'20px'}}>
      <div><Link href={`/profile/${post?.userId?._id}`}>
        {post?.userId?.username}
        </Link>
        </div>
    <h1><Link href={`/post/${post._id}`}>{post?.title}</Link></h1>
    <h1>{post?.content}</h1>
    <button onClick={() => deletePost(post._id)}>x</button>
    <button><Link href={`/edit/${post._id}`}>edit</Link></button>


    </div>


  ))}
      </div>
      </>
  )
}
