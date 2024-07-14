import { UserRepository } from '@/app/repositories/user-repository'
import { GetUserUseCase } from '@/app/use-cases/user/get-user-use-case'
import { NextResponse, NextRequest } from 'next/server'

interface Params {
    id: string
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
    const repository = new UserRepository()
    const useCase = new GetUserUseCase(repository)
    const user = await useCase.execute(params.id)

    return NextResponse.json(user)
}
