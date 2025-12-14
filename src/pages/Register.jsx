import React, { useState } from 'react'
import api from '../api'
import { saveToken } from '../utils/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const nav = useNavigate()

    async function submit(e) {
        e.preventDefault()
        setError('')
        try {
            const res = await api.post('/auth/register', { name, email, password })
            saveToken(res.data.token)
            nav('/tasks')
        } catch (err) {
            setError(err.response?.data?.message || 'Register failed')
        }
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-logo">Task Manager</div>
                <div className="auth-subtitle">Create your account</div>

                <form onSubmit={submit}>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Full name"
                        required
                    />

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
                        Create account
                    </button>

                    {error && <div className="error">{error}</div>}
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </div>
            </div>
        </div>
    );

}
