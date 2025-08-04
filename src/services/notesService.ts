import supabase from "../lib/supabaseClient";
import type { Note } from "../types/Types";
import { getDataFromLocalStorage } from "../utils";

const getUserId = () => {
    const userData = getDataFromLocalStorage()
    return userData?.id
}

export const insertNote = async (note: Note) => {
    // export const insertNote = async () => {
    try {
        const { error } = await supabase
            .from("notes")
            .insert([note]);
        // console.log("note inserted successfully")
        if (error) {
            console.log("Failed to add note", error)
        }
    } catch (error) {
        console.error("error submiting note data", error);
    }
}

export const getNotes = async (user_id: string, tag_id: string) => {
    try {
        const { data: notes, error } = await supabase
            .from("notes")
            .select("*")
            .eq("user_id", user_id)
            .eq("tag_id", tag_id)
        if (error) {
            console.log("failed to get notes", error)
            throw error
        }
        return notes
    } catch (error) {
        console.log("failed to get notes", error)
        throw error
    }
}

export const getAllNotes = async (user_id: string) => {
    try {
        const { data: notes, error } = await supabase
            .from("notes")
            .select("*")
            .eq("user_id", user_id)
        if (error) {
            console.log("failed to get All notes", error)
            throw error
        }
        return notes
    } catch (error) {
        console.log("failed to get notes", error)
        throw error
    }
}

export const numOfTagNotes = async (tag_id: string) => {
    try {
        const { count, error } = await supabase
            .from("notes")
            .select("*", { count: "exact", head: true })
            .eq("tag_id", tag_id);
        // console.log(data)
        if (error) {
            console.log("Failed to get number of tag notes", error)
            return 0
        }
        return count
    } catch (error) {
        console.log("Failed to get number of tag notes", error)
        return 0
    }
}

export const numOfUserNotes = async () => {
    const userId = getUserId()
    try {
        const { count, error } = await supabase
            .from("notes")
            .select("*", { count: "exact", head: true })
            .eq("user_id", userId);
        // console.log(data)
        if (error) {
            console.log("Failed to get number of notes", error)
            return 0
        }
        return count
    } catch (error) {
        console.log("Failed to get number of notes", error)
        return 0
    }
}


export const deleteNoteService = async (noteID: string) => {
    const userId = getUserId()
    try {
        const { data, error } = await supabase
            .from("notes")
            .delete()
            .eq("note_id", noteID)
            .eq("user_id", userId)
        if (error) {
            console.log("Failed to Delet note", error)
        }
        console.log(data)
    } catch (error) {
        console.log("Failed to Delet note", error)
    }
}

export const editNote = async (note: Note, note_id: string) => {
    const userId = getUserId()
    try {
        const { error } = await supabase
            .from("notes")
            .update([note])
            .eq('user_id', userId)
            .eq('note_id', note_id)
        console.log("Successfully edited the note")
        if (error) {
            console.log("Error editing the note", error)
        }
    } catch (error) {
        console.error("error submiting note data", error);
    }
}