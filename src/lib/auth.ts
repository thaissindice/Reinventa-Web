export type User = { email: string; role: "mentor" | "aprendiz" | "empresa" };

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

export const logout = () => localStorage.removeItem("user");
