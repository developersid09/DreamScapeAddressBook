
import { useCallback } from "react";
import api from "../api/axios";
import { useAppDispatch } from "../store";
import { loginStart, loginSuccess, loginFailure } from "../store/slices/authSlice";

export const useAuth = () => {
    const dispatch = useAppDispatch();

    const login = useCallback(async (username: string, password: string) => {
        dispatch(loginStart());
        try {
            const response = await api.post("/auth/login", { username, password });
    console.warn('response ', response)
            dispatch(loginSuccess({ token: response.data.refreshToken, user: response.data }));
            return { ok: true };
        } catch (err: any) {
            dispatch(loginFailure(err?.response?.data?.message ?? err.message ?? "Login failed"));
            return { ok: false, message: err?.response?.data?.message ?? err.message };
        }
    }, [dispatch]);

    return { login };
};
