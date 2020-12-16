import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";

function HeaderX(props) {
  return (
    <View style={[styles.container, props.style]}>
        <Image
          source={require("../assets/images/logo.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    padding: 10
  },
    image: {
    flex: 1, width: undefined, height: undefined,
    alignItems: 'center',
    justifyContent: "center",
  },
  
});

export default HeaderX;
