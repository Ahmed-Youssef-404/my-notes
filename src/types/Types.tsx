
export type userTypes = {
    id?: string,
    username: string,
    email: string,
    password: string
}

export type authDataTypes = {
    email: string,
    password: string
}

export interface Tag {
    id: number
    tagName: string
    tagDescripion: string
    userId: number
    backgrounColor: string
}
