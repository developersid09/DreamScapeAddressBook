
import React, { useMemo, useState, useCallback, useEffect } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Text, ListRenderItem } from "react-native";
import { useContacts } from "../hooks/useContacts";
import { AddressCard } from "../components/AddressCard";
import { SearchBar } from "../components/SearchBar";
import { Header } from "../components/Header";
import { Contact } from "../store/slices/contactsSlice";

const AddressBookScreen: React.FC = () => {
    const { list, favourites, loading, error, fetchContacts, toggleFav } = useContacts();
    const [query, setQuery] = useState("");

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    const data = useMemo(() => {
        if (!query) return list;
        const q = query.toLowerCase();
        return list.filter(
            (c) =>
                c.username.toLowerCase().includes(q) ||
                (c.email && c.email.toLowerCase().includes(q)) ||
                (c.phone && c.phone.includes(q))
        );
    }, [list, query]);

    const renderItem: ListRenderItem<Contact> = useCallback(
        ({ item }) => (
            <AddressCard contact={item} isFavourite={!!favourites[item.id]} onToggleFav={toggleFav} />
        ),
        [favourites, toggleFav]
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header placeholder={'Address Book'} />
            <SearchBar onSearch={setQuery} />
            <View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 12 }}
                    initialNumToRender={8}
                    windowSize={6}
                    removeClippedSubviews
                    getItemLayout={(_, index) => ({ length: 90, offset: 90 * index, index })}
                />
            </View>

        </View>
    );
};

export default AddressBookScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});
