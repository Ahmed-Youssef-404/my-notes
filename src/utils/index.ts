import type { User } from "@supabase/supabase-js";

export const saveDataInLocalStorage = (data: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(data));
  }
};

export const clearDataInLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};

export const getDataFromLocalStorage = (): User | null => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : null;
  }
  return null;
};
