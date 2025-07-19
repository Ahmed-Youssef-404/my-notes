import supabase from "../lib/supabaseClient";
import type { Tag } from "../types/Types";


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


// import supabase from "../lib/supabaseClient";
// import type { Tag } from "../types/Types";

// export const insertTag = async (tag: Tag) => {
//     try {
//         const { error } = await supabase
//             .from("tags")
//             .insert([tag]);

//         if (error) throw error;

//         console.log("Successfully added the tag");
//     } catch (error) {
//         console.error("Error submitting tag data:", error);
//     }
// };
