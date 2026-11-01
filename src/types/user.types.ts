export interface User {
    id: number
    firstName: string
    lastName: string
    age: number
    email: string
    company: {
        name: string
    }
}

export interface UsersResponse {
    users: User[]
    total: number
    skip: number
    limit: number
}
