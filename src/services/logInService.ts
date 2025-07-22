// import { useEffect } from "react";
import supabase from "../lib/supabaseClient"
import type { authDataTypes } from "../types/Types"

const getUser = async (useData: authDataTypes) => {
    //      login code
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: useData.email,
            password: useData.password,
        });

        if (error || !data.user) {
            console.log("Login failed:", error?.message);
            alert(error?.message)
            return;
        }

        return data.user

    } catch (error) {
        console.log("Unexpected error:", error);
    }

}
export default getUser

    // const {data: user, error} = await supabase
    // .from("users").select("*").eq("email",useData.email).single();
    // if (error || !user) {
    //     alert("is valid email");
    //     // console.log(error)
    //     return null
    // }   
    // if (user.password !== useData.password) {
    //     alert("is valid password");
    //     console.log(error)
    //     return null
    // }
    // console.log("Loged In as: ", user)
    // return user




// import supabase from "../lib/supabaseClient";
// import type { authDataTypes } from "../types/Types";

// export const getUser = async (useData: authDataTypes) => {
//   // تسجيل الدخول عبر Supabase Auth
//   const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
//     email: useData.email,
//     password: useData.password,
//   });

//   if (authError || !authData.session) {
//     alert("Email or password is incorrect");
//     return null;
//   }

//   console.log(authData.session.user)

//   // تسجيل الدخول نجح
//   const userId = authData.session.user.id;

//   // نجيب بيانات إضافية من جدول users
//   const { data: userProfile, error: userError } = await supabase
//     .from("users")
//     .select("*")
//     .eq("id", userId)  // خلي بالك تستخدم الـ ID مش الإيميل
//     .single();

//   if (userError || !userProfile) {
//     alert("User profile not found");
//     return null;
//   }

//   // ✅ تسجيل الدخول تم بنجاح
//   console.log("Logged in as:", userProfile);

//   return {
//     user: userProfile,
//     token: authData.session.access_token,
//   };
// };
