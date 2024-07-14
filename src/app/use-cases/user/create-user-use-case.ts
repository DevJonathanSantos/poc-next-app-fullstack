import { User, UserProps } from '../../core/user'
import { IUserRepository } from '../../repositories/user-repository'

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(userProps: UserProps) {
        const user = User.create(userProps)

        await this.userRepository.create(user)
    }
}
