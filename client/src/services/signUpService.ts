import supabase from "../lib/supabaseClient"
import type { NewUser } from "../types/Types"


export const insertUser = async (newUser: NewUser) => {
    const { data: foundEmail, error:
        _foundEmailError } = await supabase.from("users").select("email").eq("email", newUser.email);
    if (foundEmail?.length && foundEmail?.length > 0) {
        console.log("found email ", foundEmail)
        alert("Email is already used")
        return;
    }
    const { data, error } = await supabase
        .from('users') // your table name
        .insert([
            newUser
        ])
        console.log(data)
    if (error) {
        console.error('Insert error:', error)
    } else {
        console.log('User inserted:', newUser)
    }
}
