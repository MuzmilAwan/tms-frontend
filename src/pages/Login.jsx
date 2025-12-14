import React, { useState } from 'react'
import api from '../api'
import { saveToken } from '../utils/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const nav = useNavigate()

    async function submit(e) {
        e.preventDefault()
        setError('')
        try {
            const res = await api.post('/auth/login', { email, password })
            saveToken(res.data.token)
            nav('/tasks')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        }
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-logo">Task Manager</div>
                <div className="auth-subtitle">Sign in to continue</div>

                <form onSubmit={submit}>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />

                    <button className="auth-primary" type="submit">
                        Sign In
                    </button>

                    {error && <div className="error">{error}</div>}
                </form>

                <div className="auth-footer">
                    Don’t have an account? <Link to="/register">Sign up</Link>
                </div>
            </div>
        </div>
    );

}
