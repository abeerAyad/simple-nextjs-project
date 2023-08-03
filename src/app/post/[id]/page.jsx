"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const SinglePost = ({params:{id}}) => {
    const [singlePost, setSinglePost] = useState({})

    const getSinglePost = async () => {
        const { data: { post } } = await axios.get(`/api/singlePost/${id}`)
        setSinglePost(post)
    }
    useEffect(() => {
        getSinglePost()
    }, [])

  return (
      <div key={singlePost._id} style={{ border: '1px solid #555', marginTop: '20px' }}>
          <div><Link href={`/profile/${singlePost?.userId?._id}`}>
              {singlePost?.userId?.username}
          </Link>
          </div>
          <h1>{singlePost?.title}</h1>
          <h1>{singlePost?.content}</h1>
      </div>
  )
}

export default SinglePost
