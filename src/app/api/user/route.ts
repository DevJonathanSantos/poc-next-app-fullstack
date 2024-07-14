import { UserRepository } from '@/app/repositories/user-repository'
import { CreateUserUseCase } from '@/app/use-cases/user/create-user-use-case'
import { ListUsersUseCase } from '@/app/use-cases/user/list-users-use-case'
import { NextResponse, NextRequest } from 'next/server'

// const users = [
//     {
//         id: 1,
//         name: 'Jonathan',
//         email: 'jonathan@example.com',
//         age: 28,
//         city: 'New York'
//     },
//     {
//         id: 2,
//         name: 'Serena',
//         email: 'serena@example.com',
//         age: 32,
//         city: 'Los Angeles'
//     },
//     {
//         id: 3,
//         name: 'Miriane',
//         email: 'miriane@example.com',
//         age: 25,
//         city: 'Chicago'
//     },
//     {
//         id: 4,
//         name: 'Carlos',
//         email: 'carlos@example.com',
//         age: 30,
//         city: 'Miami'
//     },
//     {
//         id: 5,
//         name: 'Alicia',
//         email: 'alicia@example.com',
//         age: 27,
//         city: 'San Francisco'
//     },
//     { id: 6, name: 'David', email: 'david@example.com', age: 35, city: 'Boston' },
//     { id: 7, name: 'Emma', email: 'emma@example.com', age: 22, city: 'Seattle' }
// ]

interface Params {
    id: number
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
    const repository = new UserRepository()
    const useCase = new ListUsersUseCase(repository)
    const users = await useCase.execute()

    return NextResponse.json({ users })
}

export async function POST(request: Request) {
    try {
        const repository = new UserRepository()
        const useCase = new CreateUserUseCase(repository)
        const user = await request.json()

        await useCase.execute(user)
    } catch (error) {
        return new Response(`Webhook error: `, {
            status: 400
        })
    }

    return NextResponse.json(request)
}
