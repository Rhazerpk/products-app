import { View, ActivityIndicator } from "react-native";
import React from "react";

const ThemedActivityIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={30} />
    </View>
  );
};

export default ThemedActivityIndicator;
