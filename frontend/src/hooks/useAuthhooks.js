import { create } from "zustand";
import api from "../lib/axios";

const useAuthHook = create((set) => ({
  authUser: null,

  // Flags for loading state
  isCheckingAuth: false,
  isSigningUp: false,
  isSigningIn: false,
  isLoggingOut: false,

  // Check if user is logged in
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await api.get("/auth/check");
      if (response.data?.user) {
        set({ authUser: response.data.user });
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Sign up a new user
  signUp: async (data) => {
    set({ isSigningUp: true });

    if (!data.username || !data.email || !data.password) {
      set({ isSigningUp: false });
      return { success: false, message: "All fields are required" };
    }

    try {
      const response = await api.post("/auth/sign-up", data);
      if (response.data?.user) {
        return { success: true, message: "Sign up successful" };
      } else {
        return { success: false, message: "Unexpected error occurred" };
      }
    } catch (error) {
      console.error("Error signing up:", error);
      return { success: false, message: error?.response?.data?.message || "Sign up failed" };
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Sign in an existing user
  signIn: async (data) => {
    set({ isSigningIn: true });

    if (!data.email || !data.password) {
      set({ isSigningIn: false });
      return { success: false, message: "Email and password are required" };
    }

    try {
      const response = await api.post("/auth/sign-in", data);
      if (response.data?.user) {
        set({ authUser: response.data.user });
        return { success: true, message: "Sign in successful" };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {
      console.error("Error signing in:", error);
      return { success: false, message: error?.response?.data?.message || "Sign in failed" };
    } finally {
      set({ isSigningIn: false });
    }
  },

  // Logout the current user
  signOut: async () => {
    set({ isLoggingOut: true });

    try {
      await api.post("/auth/sign-out");
    } catch (error) {
      console.error("Error during logout:", error);
    }

    set({ authUser: null, isLoggingOut: false });
    localStorage.removeItem("token");
  }


}));

export default useAuthHook;
