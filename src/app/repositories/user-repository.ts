import { AttributeValue, DynamoDBClient, GetItemCommand, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb'
import { User } from '../core/user'

export interface IUserRepository {
    create(user: User): Promise<void>
    listAll(): Promise<User[] | undefined>
    get(pk: string, sk: string): Promise<User | undefined>
}

export class UserRepository implements IUserRepository {
    private client: DynamoDBClient
    private tableName: string

    constructor() {
        console.log(
            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1',
            JSON.stringify({
                region: process.env.REGION as string,
                credentials: {
                    accessKeyId: process.env.ACCESS_KEY as string,
                    secretAccessKey: process.env.SECRET_ACCESS_KEY as string
                }
            })
        )
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2', process.env.DATABASE_NAME)
        this.client = new DynamoDBClient({
            region: process.env.REGION as string,
            credentials: {
                accessKeyId: process.env.ACCESS_KEY as string,
                secretAccessKey: process.env.SECRET_ACCESS_KEY as string
            }
        })
        this.tableName = process.env.DATABASE_NAME as string
    }

    async create(user: User): Promise<void> {
        try {
            const command = new PutItemCommand({
                TableName: this.tableName,
                Item: user.toDynamoItem()
            })

            const { $metadata } = await this.client.send(command)

            if (!$metadata || $metadata.httpStatusCode != 200) throw Error('Failed to create.')
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async listAll(): Promise<User[] | undefined> {
        try {
            const query = new QueryCommand({
                TableName: this.tableName,
                KeyConditionExpression: 'pk = :pk ',
                ExpressionAttributeValues: {
                    ':pk': { S: `USER` }
                }
            })

            let lastKey: Record<string, AttributeValue> | undefined

            let result: User[] = []

            do {
                query.input.ExclusiveStartKey = lastKey

                const { Items, LastEvaluatedKey } = await this.client.send(query)

                console.log(Items)

                lastKey = LastEvaluatedKey

                const items = Items?.map((item) => User.fromDynamoItem(item))

                if (items) result = result.concat(items)
            } while (lastKey)

            return result
        } catch (error) {
            throw error
        }
    }

    async get(pk: string, sk: string): Promise<User | undefined> {
        try {
            const command = new GetItemCommand({
                TableName: this.tableName,
                Key: {
                    pk: { S: pk },
                    sk: { S: sk }
                }
            })
            const { Item } = await this.client.send(command)

            if (!Item) return

            console.log('FFFFFFFFFFFFFFFFFF', Item)

            return User.fromDynamoItem(Item)
        } catch (error) {
            throw error
        }
    }
}
