import supabase from "../lib/supabaseClient";

const getUserService = async () => {
  const { data, error } = await supabase.auth.getUser();
  try {
    if (data?.user) {
      return data.user;
    } else {
      console.log("No user loged");
      console.log(error);
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getUserService;
