"use client"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styles from '../Sign.module.css'


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
        <div className={styles.signContainer}>
            <h1>Login</h1>
            <div className={styles.signForm}>

             
                <div className={styles.inputGroup}>
                    <label className={styles.labelStyle} htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={user.email}
                        placeholder="Email..."
                        className={styles.inputStyle}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.labelStyle} htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        placeholder="Password..."
                        className={styles.inputStyle}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                <button  className={styles.signButton} onClick={onLogin}>
                    {!loading ? 'login' : 'Loading ...'}
                </button>
                </div>
            </div>
    )

}

export default Login



