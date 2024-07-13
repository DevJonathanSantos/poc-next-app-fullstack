import { NextResponse, NextRequest } from 'next/server'

const users = [
    {
        id: 1,
        name: 'Jonathan',
        email: 'jonathan@example.com',
        age: 28,
        city: 'New York'
    },
    {
        id: 2,
        name: 'Serena',
        email: 'serena@example.com',
        age: 32,
        city: 'Los Angeles'
    },
    {
        id: 3,
        name: 'Miriane',
        email: 'miriane@example.com',
        age: 25,
        city: 'Chicago'
    },
    {
        id: 4,
        name: 'Carlos',
        email: 'carlos@example.com',
        age: 30,
        city: 'Miami'
    },
    {
        id: 5,
        name: 'Alicia',
        email: 'alicia@example.com',
        age: 27,
        city: 'San Francisco'
    },
    { id: 6, name: 'David', email: 'david@example.com', age: 35, city: 'Boston' },
    { id: 7, name: 'Emma', email: 'emma@example.com', age: 22, city: 'Seattle' }
]

interface Params {
    id: number
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
    console.log('request', JSON.stringify(request))
    console.log('params', JSON.stringify(params))
    return NextResponse.json({ users })
}
