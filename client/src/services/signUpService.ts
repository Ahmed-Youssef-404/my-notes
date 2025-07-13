import supabase from "../lib/supabaseClient"
import type { NewUser } from "../types/Types"


export const insertUser = async (newUser: NewUser) => {

    // sign up code
    try {
        const { data, error } = await supabase.auth.signUp({
            email: newUser.email,
            password: newUser.password,
        })
        console.log(data)
        console.log(error) // هيبقى ب null بس عشان اتأكد
        if (error || !data.user) {
            console.log("Signup failed:", error?.message);
            return;
        }
        const userId = data.user.id;
        const { error: insertError } = await supabase.from("profiles").insert({
            id: userId, // ده نفس id بتاع auth.users
            username: newUser.username,
            email: data.user.email,
            numOfTags: 0, // defulat value
            numOfNotes: 0 // defulat value
        });

        if (insertError) {
            console.log("Failed to insert profile:", insertError.message);
        } else {
            console.log("Profile inserted successfully");
        }
    } catch (error) {
        console.log(error)
        return error
    }
}






















// const { data: foundEmail, error:
//     _foundEmailError } = await supabase.from("users").select("email").eq("email", newUser.email);
// if (foundEmail?.length && foundEmail?.length > 0) {
//     console.log("found email ", foundEmail)
//     alert("Email is already used")
//     return;
// }
// const { data, error } = await supabase
//     .from('users') // your table name
//     .insert([
//         newUser
//     ])
//     console.log(data)