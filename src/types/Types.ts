
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
    tag_id?: string
    created_at?: any
    title: string
    description: string
    user_id: string
    backgroutd_color: string
}

export interface Note {
    note_id?: string
    user_id: string
    tag_id: string
    title: string
    body: string
    background_color: string
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

