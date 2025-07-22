import supabase from "../lib/supabaseClient"


const handleSignOut = async () => {
    try {
        await supabase.auth.signOut()
    } catch (error) {
        console.log("error signing out:", error)
    }
}

export default handleSignOut