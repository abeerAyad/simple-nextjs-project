"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Navbar from "../components/Navbar"

const NewPost = () => {
    const [post, setPost] = useState({
        title: "",
        content: ""
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const createPost = async () => {

        try {
            setLoading(true)
            await axios.post('/api/post', post)
            router.push('/')
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }


    return (
        <div>
            <Navbar />
            <h1>create Post</h1>
                
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
                    <button onClick={createPost}>{!loading ? 'create Post' : 'Loading ...'}</button>
                </div>
            </div>
    )

}

export default NewPost



