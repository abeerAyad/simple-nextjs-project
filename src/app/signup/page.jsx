"use client"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Signup =  () => {
    const [user, setUser] = useState({
    username:"",
    email:"", 
    password:""
})
const [loading, setLoading] = useState(false)
const router = useRouter()
    const onSignup = async () => {

        try {
            setLoading(true)
            await axios.post('/api/users/signup', user)
            router.push('/login')
        } catch (error) {
            console.log(error);
    
        }finally{
            setLoading(false)
        }
    }

    console.log(user);

    return (
        <div>
           <h1>Sign up</h1>
           <div>
                <Image
                    src='/assets/loggedBg.jfif'
                    alt='sign'
                    width={100}
                    height='100'
                    style={{}}
                />
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                    id='username'
                    type='text'
                    value={user.username}
                    placeholder="Username ..."
                    onChange={(e) => setUser({...user,username: e.target.value})}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        id='email'
                        type='text'
                        value={user.email}
                        placeholder="Email ..."
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    
                    <label htmlFor="password">Password</label>
                    <input
                        id='password'
                        type='text'
                        value={user.password}
                        placeholder="Password ..."
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    <button onClick={onSignup}>{!loading ? 'Sign up':'Loading ...'}</button>
                </div>
           </div>
        </div>
    )

}

export default Signup


