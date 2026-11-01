import { api } from "./axios"
import type { UsersResponse } from "../types/user.types"

export const getUsers = async (
    limit: number = 10,
    skip: number = 0,
): Promise<UsersResponse> => {
    const response = await api.get<UsersResponse>("/users", {
        params: {
            limit,
            skip,
        },
    })

    return response.data
}
