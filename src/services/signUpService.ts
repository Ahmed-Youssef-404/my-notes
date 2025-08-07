import supabase from "../lib/supabaseClient"
import type { NewUser } from "../types/Types"
import { type User } from "@supabase/supabase-js"

export const insertUser = async (newUser: NewUser): Promise<User | null> => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: newUser.email,
            password: newUser.password,
        });

        if (error || !data.user) {
            console.log("Signup failed:", error?.message);
            return null;
        }

        const userId = data.user.id;

        let imageUrl = null;

        // ✅ لو فيه صورة مرفوعة، ارفعها على Supabase Storage
        if (newUser.image) {
            const file = newUser.image;
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true,
                    contentType: file.type,
                    metadata: {
                        owner: userId
                    },
                });
            if (uploadError) {
                console.error("Image upload error:", uploadError.message);
            } else {
                const { data: publicUrlData } = supabase.storage
                    .from("avatars")
                    .getPublicUrl(filePath);
                imageUrl = publicUrlData?.publicUrl;
            }
        }

        // ✅ إدخال بيانات اليوزر في جدول profiles مع رابط الصورة
        const { error: insertError } = await supabase.from("profiles").insert({
            id: userId,
            username: newUser.username,
            email: newUser.email,
            user_profile: imageUrl, // الصورة هنا
        });

        if (insertError) {
            console.log("Failed to insert profile:", insertError.message);
        } else {
            console.log("Profile inserted successfully");
        }

        return data.user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



































// export const insertUser = async (newUser: NewUser): Promise<User | null> => {

//     // sign up code
//     try {
//         const { data, error } = await supabase.auth.signUp({
//             email: newUser.email,
//             password: newUser.password,
//         })
//         console.log("data after signup:", data)
//         console.log(error) // هيبقى ب null بس عشان اتأكد
//         if (error || !data.user) {
//             console.log("Signup failed:", error?.message);
//             // alert(error?.message)
//             return null;
//         }
//         const userId = data.user.id;
//         const { error: insertError } = await supabase.from("profiles").insert({
//             id: userId, // ده نفس id بتاع auth.users
//             username: newUser.username,
//             email: data.user.email,
//             // numOfTags: 0, // defulat value
//             // numOfNotes: 0 // defulat value
//         });

//         if (insertError) {
//             console.log("Failed to insert profile:", insertError.message);
//             // alert(insertError.message)
//         } else {
//             console.log("Profile inserted successfully");
//         }

//         return data.user
//     } catch (error) {
//         console.log(error)
//         throw error
//     }
// }

















