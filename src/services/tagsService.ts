import supabase from "../lib/supabaseClient";
import type { Tag } from "../types/Types";
import { getDataFromLocalStorage } from "../utils";

const getUserId =()=>{
const userData = getDataFromLocalStorage()
    return userData?.id
}

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


export const getTags = async () => {
    const userId = getUserId()
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
    const userId = getUserId()
    try {
        const { count, error } = await supabase
            .from("tags")
            .select("*", { count: "exact", head: true })
            .eq("user_id", userId);
        // console.log(data)
        // console.log(userId)
        if (error) {
            console.log("Failed to get number of Tags", error)
            return 0
        }
        return count
    } catch (error) {
        console.log("Failed to get number of Tags", error)
        return 0
    }
}

export const deleteTagService = async (tagId: string)=>{
    const userId = getUserId()
    try {
        const { data, error } = await supabase
            .from("tags")
            .delete()
            .eq("tag_id", tagId)
            .eq("user_id", userId)
        if (error) {
            console.log("Failed to Delet Tag", error)
        }
        console.log(data)
    } catch (error) {
        console.log("Failed to Delet Tag", error)
    }
}

// export const insertNote = async (userId: Text, noteId: Text) => {
// export const insertNote = async () => {
//     try {
//         const {data, error} = supabase
//             .from("notes")
//             .insert({
//                 user_id:"d2b12eb2-a564-4550-9314-259992708e6e",
//                 tag_id:"467faa28-24cf-4230-804f-d8fc13a62b79",
//                 title:"test note",
//                 body:"this is the first note",
//                 background_color:"#FF5733",
//             });
//             if (error) {
//                 console.log("Failed to add note", error)
//             }
//     } catch (error) {
        
//     }
// }

// export const getTags = async (user_id: string) => {
//     try {
//         const { data, error } = await supabase
//             .from("tags")
//             .select("*")
//             .eq("user_id", user_id);
//         const tags = data as Tag[] | null;
//         if (error) {
//             console.log("Failed to get tags", error.message)
//             return []
//         }
//         return tags
//     } catch (error) {
//         console.log("Failed to get tags", error)
//         return []
//     }
// }
