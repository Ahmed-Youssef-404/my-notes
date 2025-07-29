import supabase from "../lib/supabaseClient"
import { getDataFromLocalStorage } from "../utils"

const getUserId = () => {
    const userData = getDataFromLocalStorage()
    return userData?.id
}

export const searchService = async (searchFor: string, text: string) => {

    const userId = getUserId()

    try {
        const { data, error } = await supabase
            .from(searchFor)
            .select("*")
            .ilike("title", `%${text}%`)
            .eq("user_id", userId)

        if (error) {
            console.log(`couldn't featch ${searchFor}`, error)
        }
        return data
    } catch (error) {
        console.log(`couldn't featch ${searchFor}`, error)
    }
}