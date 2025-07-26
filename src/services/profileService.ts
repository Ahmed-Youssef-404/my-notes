import supabase from "../lib/supabaseClient";
// import { getUserId } from "./logInService";


export const profileDetailes = async (userId: string) => {
    const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (profileError) {
        console.log("❌ Failed to fetch profile:", profileError.message);
        return null;
    }

    // console.table(profileData);
    return profileData;
}
