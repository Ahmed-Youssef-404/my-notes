import supabase from "../lib/supabaseClient";
import type { Tag } from "../types/Types";
import { getDataFromLocalStorage } from "../utils";


const userData = getDataFromLocalStorage()
const userId = userData?.id
console.log(userData?.id)

export const insertTag = async (tag: Tag) => {
    try {
        const { error } = await supabase
            .from("tags")
            .insert([tag]);
        console.log("Successfully added the tag")
        alert(`Successfully added the tag "${tag.title}"`);
        if (error) {
            console.log("Error adding the tag", error)
        }
    } catch (error) {
        console.error("error submiting tag data", error);
    }

}


export const getTags = async (user_id: string) => {
    try {
        const { data: tags, error } = await supabase
            .from("tags")
            .select("*")
            .eq("user_id", userId);
        if (error) {
            console.log("Failed to get tags", error.message)
            return []
        }
        return tags
    } catch (error) {
        console.log("Failed to get tags", error)
        return []
    }
}

export const numOfTags = async () => {
    try {
        const { data, count, error } = await supabase
            .from("tags")
            .select("*", { count: "exact", head: true })
            .eq("user_id", userId);
        // console.log(data)
        if (error) {
            console.log("Failed to get number of Tags", error)
            return
        }
        return count
    } catch (error) {
        console.log("Failed to get number of Tags", error)
        return []
    }

}