"use client"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const onLogin = async () => {

        try {
            setLoading(true)
            await axios.post('/api/users/login', user)
            router.push('/')
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }


    return (
        <div>
            <h1>Login</h1>
            <div>
                <Image
                    src='/assets/loggedBg.jfif'
                    alt='sign'
                    width={100}
                    height='100'
                />
                <div>

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
                    <button onClick={onLogin}>{!loading ? 'login' : 'Loading ...'}</button>
                </div>
            </div>
        </div>
    )

}

export default Login



