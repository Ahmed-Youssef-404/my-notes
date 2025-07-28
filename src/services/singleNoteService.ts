import supabase from "../lib/supabaseClient"
import type { Note } from "../types/Types";

export const getSingleNote = async (note_id: string) => {
    try {
        const { data: note, error } = await supabase
            .from("notes")
            .select("*")
            .eq("note_id", note_id)
            const singleNote = note as Note[] | null;
        if (error) {
            console.log("Failed to get note detailes", error.message)
            throw error
        }
        // console.log("tag is",singleTag)
        // console.table(singleTag)
        return singleNote
    } catch (error) {
        console.log("Failed to get note", error)
        throw error
    }
}