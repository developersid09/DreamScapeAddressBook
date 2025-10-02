
import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AddressCard } from "../components/AddressCard";
import { Header } from "../components/Header";

const FavouritesScreen: React.FC = () => {
    const favouritesMap = useSelector((s: RootState) => s.contacts.favourites);

    const favArray = useMemo(() => Object.values(favouritesMap), [favouritesMap]);

    return (
        <View style={styles.container}>
            {favArray.length === 0 ? (
                <View>
                    <Header placeholder={'Favourites'} />
                    <Text style={styles.empty}>{'No favourites yet. \n\nTap the star on any contact.'}</Text>
                </View>
            ) : (
                <View>
                    <Header placeholder={'Favourites'} />
                    <FlatList
                        data={favArray}
                        renderItem={({ item }) => <AddressCard contact={item} isFavourite onToggleFav={() => { }} />}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ padding: 12 }}
                    />
                </View>

            )}
        </View>
    );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    empty: {
        marginTop: 200,
        textAlign: "center",
        color: "#666"
    },
});
