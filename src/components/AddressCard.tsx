
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Contact } from "../store/slices/contactsSlice";

type Props = {
  contact: Contact;
  isFavourite?: boolean;
  onToggleFav: (c: Contact) => void;
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.max(320, width - 32);

export const AddressCard: React.FC<Props> = ({ contact, isFavourite, onToggleFav }) => {
  return (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      <View style={styles.header}>
        <Image
          source={{ uri: contact.image ?? "https://placehold.co/64x64" }}
          style={styles.avatar}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>{contact.username}</Text>
          {contact.company ? <Text style={styles.company}>{contact.company.name}</Text> : null}
          <Text style={styles.small}>{contact.email}</Text>
        </View>
        <TouchableOpacity onPress={() => onToggleFav(contact)} accessibilityLabel="Favourite button">
          <Text style={{ fontSize: 22 }}>{isFavourite ? "★" : "☆"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  header: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 64, height: 64, borderRadius: 12, backgroundColor: "#eee" },
  name: { fontSize: 16, fontWeight: "600" },
  company: { fontSize: 13, color: "#666" },
  small: { fontSize: 12, color: "#999" },
});
