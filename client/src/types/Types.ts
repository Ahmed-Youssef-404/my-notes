
export interface userTypes {
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


export interface NewUser {
    username: string;
    email: string;
    password: string;
}
export interface userProfile {
    username: string;
    email: string;
    password: string;
    created_at: string;
    id: string;
    numOfNotes: number;
    numOfTags: number;
}

