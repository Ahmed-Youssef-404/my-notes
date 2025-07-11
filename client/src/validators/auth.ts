import * as yup from "yup";



export const usernameSchema = yup.string().required().nonNullable().min(3,"User name must be at least 3 characters").max(20,"User name must be at most 20 characters")


export const emailSchema = yup.string()
.required("Enter you E-mail")
.email("Enter a valid E-mail")
.matches(/^[a-zA-Z0-9._%+-]+@(gmail|outlook)\.com$/, "The E-mail must be @gmail.com or @outlook.com")


export const passwordSchema = yup.string()
    .required("Enter the Passwrod").min(6,"Password must be at least 6 characters")


export const SingInSchema = yup.object({
    emailSchema,
    passwordSchema,

})


export const SingUpSchema = yup.object({
    usernameSchema,
    emailSchema,
    passwordSchema
})


