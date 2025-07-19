import supabase from "../lib/supabaseClient"
import type { NewUser } from "../types/Types"
import { isAuthError, type User } from "@supabase/supabase-js"

export const insertUser = async (newUser: NewUser): Promise<User | null> => {

    // sign up code
    try {
        const { data, error } = await supabase.auth.signUp({
            email: newUser.email,
            password: newUser.password,
        })
        console.log("data after signup:", data)
        console.log(error) // هيبقى ب null بس عشان اتأكد
        if (error || !data.user) {
            console.log("Signup failed:", error?.message);
            alert(error?.message)
            return null;
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
            alert(insertError.message)
        } else {
            console.log("Profile inserted successfully");
        }

        return data.user 
    } catch (error) {
        console.log(error)
        throw error
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