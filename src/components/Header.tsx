
import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

type Props = {
  placeholder?: string;
};

export const Header: React.FC<Props> = ({ placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{placeholder}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  headerText: { fontSize: 20, fontWeight: "600", padding: 8 },
  input: {
    backgroundColor: "#f2f4f7",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
});
