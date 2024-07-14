import { AttributeValue } from '@aws-sdk/client-dynamodb'

import { Item } from './item'
import { randomUUID } from 'crypto'

export interface UserProps {
    id: string
    name: string
    email: string
    age: number
    city: string
}

export class User extends Item<UserProps> {
    get pk(): string {
        return `USER`
    }
    get sk(): string {
        return `${this.props.id!}`
    }
    get data(): UserProps {
        return this.props
    }

    static getKey(id: string) {
        return {
            pk: `USER`,
            sk: id
        }
    }

    toDynamoItem(): Record<string, AttributeValue> {
        const item: Record<string, AttributeValue> = {
            ...this.keys(),
            id: { S: this.props.id! },
            name: { S: this.props.name },
            email: { S: this.props.email },
            age: { N: this.props.age.toString() },
            city: { S: this.props.city }
        }

        return item
    }

    static fromDynamoItem(item: Record<string, AttributeValue>): User {
        const { id, name, email, age, city } = item

        return new User({ id: id.S!, name: name.S!, email: email.S!, age: Number(age.N), city: city.S! })
    }

    static create({ name, email, age, city }: UserProps): User {
        const id = randomUUID()
        return new User({ id, name, email, age, city })
    }
}
