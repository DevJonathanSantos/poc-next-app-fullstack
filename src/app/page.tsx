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

    async function fetchUsers() {
        try {
            const response = await fetch('/api/user')
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }
            const data = await response.json()
            setUsers(data.users)
        } catch (err) {
        } finally {
            setLoading(false)
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
                    {users.map((user) => (
                        <li key={user.id} style={{ cursor: 'pointer', margin: '5px' }} onClick={() => getById(user.id)}>
                            <p>
                                User:&nbsp;
                                <code className={styles.code}>{user.name}</code>
                            </p>
                        </li>
                    ))}
                </ul>
                <p>
                    <code className={styles.code}>
                        {' '}
                        {user && (
                            <>
                                {user.name} - {user.email} - {user.age} - {user.city}
                            </>
                        )}
                    </code>
                </p>
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
