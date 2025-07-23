import { create } from "zustand";
import api from "../lib/axios";

const useAuthHook = create((set) => ({
    authUser: null,
    isCheckingAuth: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await api.get("/auth/check");
            set({ authUser: response.data.user, isCheckingAuth: false });
        } catch (error) {
            console.error("Error checking auth:", error);
            set({ isCheckingAuth: false });
        }
    }
}));
export default useAuthHook;