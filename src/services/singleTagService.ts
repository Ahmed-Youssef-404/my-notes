import supabase from "../lib/supabaseClient"
import type { Tag } from "../types/Types";

export const getSingleTag = async (tag_id: string) => {
    try {
        const { data: tag, error } = await supabase
            .from("tags")
            .select("*")
            .eq("tag_id", tag_id)
            const singleTag = tag as Tag[] | null;
        if (error) {
            console.log("Failed to get tag detailes", error.message)
            throw error
        }
        // console.log("tag is",singleTag)
        // console.table(singleTag)
        return singleTag
    } catch (error) {
        console.log("Failed to get tags", error)
        throw error
    }
}