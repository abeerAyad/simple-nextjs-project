"use client"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styles from '../Sign.module.css'
import Link from "next/link"

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
        <div className={styles.signContainer}>
            <h1>Sign up</h1>
            <div className={styles.signForm}>
              
                <div className={styles.inputGroup}>
                    <label className={styles.labelStyle} htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={user.username}
                        placeholder="Username..."
                        className={styles.inputStyle}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </div>
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

                <p>Already have an account?
                     <Link href="/login">Login</Link>
                </p>
                
                <button onClick={onSignup} className={styles.signButton}>
                    {!loading ? 'Sign up' : 'Loading...'}
                </button>
            </div>
        </div>
    );
};


export default Signup



