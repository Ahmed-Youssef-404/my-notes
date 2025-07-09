import * as yup from "yup";

export const SingInSchema = yup.object({
    email: yup.string()
        .required("Enter you E-mail")
        .email("Enter a valid E-mail")
        .matches(/^[a-zA-Z0-9._%+-]+@(gmail|outlook)\.com$/, "The E-mail must be @gmail.com or @outlook.com"),

    password: yup.string()
        .required("Enter the Passwrod")
})
