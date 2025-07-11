import supabase from "../lib/supabaseClient"
import type { authDataTypes } from "../types/Types"

export const getUser = async (useData: authDataTypes) => {
    const {data: user, error} = await supabase
    .from("users").select("*").eq("email",useData.email).single();

    if (error || !user) {
        alert("is valid email");
        console.log(error)
        return null
    }
    
    if (user.password !== useData.password) {
        alert("is valid password");
        console.log(error)
        return
        return null
    }

    console.log("Loged In as: ", user)
    return user
}