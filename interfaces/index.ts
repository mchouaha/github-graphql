export interface Repository {
    id: string
    name: string
    description: string
    url: string
    stargazers: {
        totalCount: number
    }
    fork: {
        totalCount: number
    }
}

export interface User {
    avatarUrl: string
    repositories: {
        nodes: Repository []
    }
}
