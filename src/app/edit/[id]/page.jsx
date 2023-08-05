"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"

const NewPost = ({params:{id}}) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    const [post, setPost] = useState({
        title: "",
        content: ""
    })
    

    const getPost = async () => {
        const { data: { post } } = await axios.get(`/api/posts/${id}`)
        setPost(post);
    }

    const updatePost = async () => {
        try {
            setLoading(true)
            await axios.put(`/api/posts/${id}`, post)
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPost()
    },[])

   

    return (
        <div>
            <Navbar />
            <h1>Edit Post</h1>

            <div>

                <label htmlFor="title">title</label>
                <input
                    id='title'
                    type='text'
                    value={post.title}
                    placeholder="Title ..."
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                />

                <label htmlFor="content">Content</label>
                <input
                    id='content'
                    type='text'
                    value={post.content}
                    placeholder="Content ..."
                    onChange={(e) => setPost({ ...post, content: e.target.value })}
                />
                <button onClick={updatePost}>{!loading ? 'Edit' : 'Loading ...'}</button>
            </div>
        </div>
    )

}

export default NewPost



