'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react'

interface User {
    id: number
    name: string
    email: string
    age: number
    city: string
}

export default function Home() {
    const [users, setUsers] = useState<User[]>([])
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [newUser, setNewUser] = useState<Omit<User, 'id'>>({ name: '', email: '', age: 0, city: '' })

    async function fetchUsers() {
        try {
            const response = await fetch('/api/user')
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }
            const data = await response.json()
            setUsers(data.users)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    async function create() {
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            // Refresh users list
            fetchUsers()
            // Reset the form
            setNewUser({ name: '', email: '', age: 0, city: '' })
        } catch (err) {
            console.error(err)
        }
    }

    async function getById(id: number) {
        try {
            const res = await fetch(`/api/user/${id}`)
            if (!res.ok) {
                throw new Error(`Error: ${res.status}`)
            }
            const user: User = await res.json()
            setUser(user)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <ul>
                    {users &&
                        users.map((user) => (
                            <li
                                key={user.id}
                                style={{ cursor: 'pointer', margin: '5px' }}
                                onClick={() => getById(user.id)}
                            >
                                <p>
                                    User:&nbsp;
                                    <code className={styles.code}>{user.name}</code>
                                </p>
                            </li>
                        ))}
                </ul>
                <p>
                    <code className={styles.code} style={{ width: 100 }}>
                        {' '}
                        {user && (
                            <>
                                {user.name} - {user.email} - {user.age} - {user.city}
                            </>
                        )}
                    </code>
                </p>
                <form
                    style={{ marginTop: '300px' }}
                    onSubmit={(e) => {
                        e.preventDefault()
                        create()
                    }}
                >
                    <h2>Add New User</h2>
                    <input
                        style={{ padding: '4px', borderRadius: '7px', cursor: 'pointer', margin: '2px' }}
                        type="text"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        required
                    />
                    <input
                        style={{ padding: '4px', borderRadius: '7px', cursor: 'pointer', margin: '2px' }}
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        required
                    />
                    <input
                        style={{ padding: '4px', borderRadius: '7px', cursor: 'pointer', margin: '2px' }}
                        type="number"
                        placeholder="Age"
                        value={newUser.age}
                        onChange={(e) => setNewUser({ ...newUser, age: Number(e.target.value) })}
                        required
                    />
                    <input
                        style={{ padding: '4px', borderRadius: '7px', cursor: 'pointer', margin: '2px' }}
                        type="text"
                        placeholder="City"
                        value={newUser.city}
                        onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
                        required
                    />
                    <button
                        type="submit"
                        style={{ padding: '4px', borderRadius: '7px', cursor: 'pointer', margin: '2px' }}
                    >
                        Add User
                    </button>
                </form>
                <div>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        By{' '}
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            className={styles.vercelLogo}
                            width={100}
                            height={24}
                            priority
                        />
                    </a>
                </div>
            </div>

            <div className={styles.center}>
                <Image className={styles.logo} src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
            </div>
        </main>
    )
}
