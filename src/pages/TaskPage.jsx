import React, { useEffect, useState } from 'react'
import api from '../api'
import { clearToken } from '../utils/auth'

function TaskCard({ task, onDelete, onEdit }) {
    return (
        <div className="task">
            <h4>{task.title}</h4>
            <div>{task.description}</div>
            <div>Tags: {task.tags && task.tags.join(', ')}</div>
            <div>Priority: {task.priority} | Status: {task.status}</div>
            <div className="task-actions">

                <button className="secondary" onClick={() => onEdit(task)}>Edit</button>
                <button className="danger" onClick={() => onDelete(task._id)}>Delete</button>

            </div>
        </div>
    )
}

export default function TaskPage() {
    const [tasks, setTasks] = useState([])
    const [page, setPage] = useState(1)
    const [limit] = useState(6)
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState('')
    const [form, setForm] = useState({ title: '', description: '', tags: '', priority: 'medium', status: 'todo' })
    const [editing, setEditing] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => { fetchTasks() }, [page])

    async function fetchTasks() {
        try {
            const q = new URLSearchParams({ page, limit, search, tags }).toString()
            const res = await api.get(`/tasks?${q}`)
            setTasks(res.data.tasks)
            setTotal(res.data.total)
        } catch (err) {
            if (err.response?.status === 401) {
                clearToken();
                window.location.href = '/login'
            }
        }
    }

    async function submit(e) {
        e.preventDefault(); setError('')
        try {
            const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
            if (editing) {
                await api.put(`/tasks/${editing._id}`, payload)
                setEditing(null)
            } else {
                await api.post('/tasks', payload)
            }
            setForm({ title: '', description: '', tags: '', priority: 'medium', status: 'todo' })
            fetchTasks()
        } catch (err) { setError(err.response?.data?.message || 'Failed') }
    }

    async function remove(id) {
        if (!confirm('Delete this task?')) return
        await api.delete(`/tasks/${id}`)
        fetchTasks()
    }

    function startEdit(task) {
        setEditing(task)
        setForm({ title: task.title, description: task.description || '', tags: (task.tags || []).join(', '), priority: task.priority, status: task.status })
    }

    function logout() { clearToken(); window.location.href = '/login' }

    return (
        <div className="container">
            <header className="top">
                <h1>Tasks Management Dashboard</h1>
                <div>
                    <button className="secondary" onClick={logout}>Logout</button>
                </div>
            </header>

            <section className="controls">
                <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
                <input placeholder="Tags (comma)" value={tags} onChange={e => setTags(e.target.value)} />
                <button onClick={() => { setPage(1); fetchTasks(); }}>Search</button>
            </section>

            <section className="form-card">
                <h3>{editing ? 'Edit Task' : 'Create Task'}</h3>
                <form onSubmit={submit}>
                    <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" />
                    <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" />
                    <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="tags (comma separated)" />
                    <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <div>
                        <button className="primary" type="submit">{editing ? 'Save Task' : 'Create Task'}</button>
                        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ title: '', description: '', tags: '', priority: 'medium', status: 'todo' }) }}>Cancel</button>}
                    </div>
                    {error && <div className="error">{error}</div>}
                </form>
            </section>

            <section className="list">
                {tasks.length === 0 && <div>No tasks</div>}
                {tasks.map(t => <TaskCard key={t._id} task={t} onDelete={remove} onEdit={startEdit} />)}
            </section>

            <footer className="pagination">
                <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
                <span>Page {page}</span>
                <button disabled={(page * limit) >= total} onClick={() => setPage(p => p + 1)}>Next</button>
            </footer>
        </div>
    )
}
