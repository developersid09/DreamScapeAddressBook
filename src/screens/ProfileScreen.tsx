
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import api from "../api/axios";
import { Header } from "../components/Header";

const ProfileScreen: React.FC = () => {
    const authUser = useSelector((s: RootState) => s.auth.user);
    const [profile, setProfile] = useState<any | null>(authUser);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!authUser) return;
            setLoading(true);
            try {
                const res = await api.get(`/users/${authUser.id}`);
                setProfile(res?.data);
            } catch (err) {
                console.warn("profile fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [authUser]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header placeholder={'Profile'} />
            <View style={{ marginTop: 12, padding: 16 }}>
                <Text style={styles.name}>{profile?.firstName} {profile?.lastName}</Text>
                <Text style={styles.info}>{profile?.email}</Text>
            </View>
            <View style={{ marginTop: 12, padding: 16 }}>
                <Text style={styles.sectionTitle}>Username</Text>
                <Text>{profile?.username}</Text>
            </View>
            <View style={{ marginTop: 12, padding: 16 }}>
                <Text style={styles.sectionTitle}>Address</Text>
                <Text>{profile?.address?.address}, {profile?.address?.city}, {profile?.address?.state}</Text>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    name: {
        fontSize: 24,
        fontWeight: "700"
    },
    info: {
        color: "#666"
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8
    }
});


//{
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3NTkzOTc3ODYsImV4cCI6MTc1OTQwMTM4Nn0.pDto6sNvaAS0OxBnGxverJcX5cUlVYa7HG2kYtp6u9k",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3NTkzOTc3ODYsImV4cCI6MTc2MTk4OTc4Nn0.sVHjMdRA3eUX6YAF7pw-k0MiQbCnktifNxya9yYV6PA",
//     "id": 1,
//     "username": "emilys",
//     "email": "emily.johnson@x.dummyjson.com",
//     "firstName": "Emily",
//     "lastName": "Johnson",
//     "gender": "female",
//     "image": "https://dummyjson.com/icon/emilys/128"
// }