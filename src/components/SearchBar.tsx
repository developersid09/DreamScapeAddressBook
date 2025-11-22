
import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";

type Props = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

export const SearchBar: React.FC<Props> = ({ onSearch, placeholder = "Search contacts..." }) => {
  const [q, setQ] = useState("");

  useEffect(() => {
    const t = setTimeout(() => onSearch(q.trim()), 300);//debounce
    return () => clearTimeout(t);
  }, [q, onSearch]);

  return (
    <View style={styles.container}>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder={placeholder}
        style={styles.input}
        accessible
        accessibilityLabel="Search contacts"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white'
  },
  input: {
    backgroundColor: "#f2f4f7",
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 44,
  },
});
