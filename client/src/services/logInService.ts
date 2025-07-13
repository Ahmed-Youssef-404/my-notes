import { useEffect } from "react";
import supabase from "../lib/supabaseClient"
import type { authDataTypes } from "../types/Types"

export const getUser = async (useData: authDataTypes) => {
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


    try {
        const { data, error } = await supabase.auth.signUp({
            // email: useData.email,
            // password: useData.password,
            email: "testmail3@gmail.com",
            password: "pass1111",
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
            username: "ahmed",
            email: data.user.email,
            numOfTags: 0,
            numOfNotes: 0
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
