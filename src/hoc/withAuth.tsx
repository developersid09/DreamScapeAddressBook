
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigation } from "@react-navigation/native";

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
    return function Protected(props: P) {
        const token = useSelector((s: RootState) => s.auth.token);
        const nav = useNavigation();

        useEffect(() => {
            if (!token) {
                nav.navigate("Login");
            }
        }, [token, nav]);

        if (!token) return null;
        return <WrappedComponent {...props} />;
    };
}
